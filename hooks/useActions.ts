'use client';

import { useState, useCallback, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { ActionNode, fetchActions, updateActions } from '@/lib/supabase/actions';
import { useAuth } from './useAuth';
import { toast } from 'react-hot-toast';

// Helper function to find a node and its parent recursively
// Returns { node, parent, siblingsArray } if found
type FindResult = {
  node: ActionNode;
  parent: ActionNode | null;
  siblingsArray: ActionNode[];
  indexInSiblings: number;
};

function findNodeAndContext(
  nodes: ActionNode[],
  targetId: string,
  parent: ActionNode | null = null
): FindResult | null {
  for (let i = 0; i < nodes.length; i++) {
    const node = nodes[i];
    if (node.id === targetId) {
      return { node, parent, siblingsArray: nodes, indexInSiblings: i };
    }
    if (node.children && node.children.length > 0) {
      const found = findNodeAndContext(node.children, targetId, node);
      if (found) return found;
    }
  }
  return null;
}

// Helper function to create a deep copy of the tree to ensure immutability
function deepCopyActions(nodes: ActionNode[]): ActionNode[] {
  return nodes.map(node => ({
    ...node,
    children: node.children ? deepCopyActions(node.children) : []
  }));
}

export const useActions = (isOwner: boolean, timezone?: string) => {
  const { user } = useAuth();
  const [actions, setActions] = useState<ActionNode[]>([]);
  const [loading, setLoading] = useState(false);

  // Fetch initial data
  useEffect(() => {
    if (isOwner && user) {
      setLoading(true);
      fetchActions(user.id, timezone || 'UTC')
        .then(setActions)
        .catch(err => console.error("Failed to fetch actions:", err))
        .finally(() => setLoading(false));
    }
  }, [isOwner, user, timezone]);

  // Central save function with optimistic update
  const save = useCallback(async (newTree: ActionNode[]) => {
    setActions(newTree); // Optimistic update
    if (isOwner && user) {
      try {
        await updateActions(user.id, newTree);
      } catch (error) {
        console.error("Failed to persist actions:", error);
        toast.error("Failed to save actions. Please try again.");
        // In a real app, we might trigger a toast or revert state here
      }
    }
  }, [isOwner, user]);

  // --- CRUD Helpers (Recursive) ---

  const addAction = (description: string, parentId?: string) => {
    const addRecursive = (nodes: ActionNode[], currentParentId?: string): ActionNode[] => {
      // If parentId is not provided, or current level is the target parent, add to this level
      if (!currentParentId && !parentId) { // Adding to root
        return [
          ...nodes,
          {
            id: uuidv4(),
            description,
            completed: false,
            // originalIndex: nodes.length, // originalIndex is not strictly necessary for unique IDs
            children: [],
            completed_at: undefined
          }
        ];
      }

      return nodes.map(node => {
        if (node.id === parentId) {
          // Found the parent, add child to its children array
          return {
            ...node,
            children: [
              ...(node.children || []),
              {
                id: uuidv4(),
                description,
                completed: false,
                // originalIndex: node.children?.length || 0,
                children: [],
                completed_at: undefined
              }
            ]
          };
        } else if (node.children && node.children.length > 0) {
          // Recursively search in children
          return { ...node, children: addRecursive(node.children, node.id) };
        }
        return node;
      });
    };
    save(addRecursive(deepCopyActions(actions))); // Use deep copy for immutability
  };

  const toggleAction = (id: string) => {
    const toggleRecursive = (nodes: ActionNode[]): ActionNode[] => {
      return nodes.map(node => {
        if (node.id === id) {
          const newCompleted = !node.completed;
          return {
            ...node,
            completed: newCompleted,
            completed_at: newCompleted ? new Date().toISOString() : undefined
          };
        } else if (node.children && node.children.length > 0) {
          return { ...node, children: toggleRecursive(node.children) };
        }
        return node;
      });
    };
    save(toggleRecursive(deepCopyActions(actions))); // Use deep copy for immutability
  };

  const updateActionText = (id: string, newText: string) => {
    const updateRecursive = (nodes: ActionNode[]): ActionNode[] => {
      return nodes.map(node => {
        if (node.id === id) {
          return { ...node, description: newText };
        } else if (node.children && node.children.length > 0) {
          return { ...node, children: updateRecursive(node.children) };
        }
        return node;
      });
    };
    save(updateRecursive(deepCopyActions(actions))); // Use deep copy for immutability
  };

  const deleteAction = (id: string) => {
    const deleteRecursive = (nodes: ActionNode[]): ActionNode[] => {
      // Filter out the target node at the current level
      const newNodes = nodes.filter(node => node.id !== id);
      // Recursively apply to children of remaining nodes
      return newNodes.map(node => {
        if (node.children && node.children.length > 0) {
          return { ...node, children: deleteRecursive(node.children) };
        }
        return node;
      });
    };
    save(deleteRecursive(deepCopyActions(actions))); // Use deep copy for immutability
  };

  /**
   * Indents an action, making it a child of the preceding sibling.
   * If there's no preceding sibling, no change occurs.
   */
  const indentAction = (id: string) => {
    const newActions = deepCopyActions(actions);
    const targetContext = findNodeAndContext(newActions, id);

    if (!targetContext) return; // Node not found
    if (targetContext.indexInSiblings === 0) {
      // Cannot indent if it's the first sibling
      // toast.info("Cannot indent first item.");
      return;
    }

    const { node: targetNode, siblingsArray, indexInSiblings } = targetContext;
    const previousSibling = siblingsArray[indexInSiblings - 1];

    if (!previousSibling) return; // Should not happen if indexInSiblings > 0

    // Remove targetNode from its current position
    siblingsArray.splice(indexInSiblings, 1);

    // Add targetNode to the children of the previous sibling
    previousSibling.children = [...(previousSibling.children || []), targetNode];

    save(newActions);
  };

  /**
   * Outdents an action, making it a sibling of its current parent.
   * Inserts it right after the parent. If it's a top-level node, no change occurs.
   */
  const outdentAction = (id: string) => {
    const newActions = deepCopyActions(actions);
    const targetContext = findNodeAndContext(newActions, id);

    if (!targetContext || !targetContext.parent) return; // Node not found or already top-level

    const { node: targetNode, parent, siblingsArray, indexInSiblings } = targetContext;
    
    // Remove targetNode from its current parent's children
    siblingsArray.splice(indexInSiblings, 1);

    // Find parent's context to insert targetNode as its sibling
    const parentContext = findNodeAndContext(newActions, parent.id);

    if (parentContext) {
      // Insert targetNode right after its former parent
      parentContext.siblingsArray.splice(parentContext.indexInSiblings + 1, 0, targetNode);
    } else {
      // Parent was a top-level node, insert targetNode into the main array
      // This case should be covered by findNodeAndContext returning null for parent.
      // If parent is top-level, parentContext will be null, and targetNode is inserted into the main array.
      const parentIndexInRoot = newActions.findIndex(node => node.id === parent.id);
      if (parentIndexInRoot !== -1) {
        newActions.splice(parentIndexInRoot + 1, 0, targetNode);
      } else {
        // Fallback: Add to root if parent not found (shouldn't happen with findNodeAndContext)
        newActions.push(targetNode);
      }
    }

    save(newActions);
  };

  /**
   * Moves an action up in its sibling list.
   * If it's already the first sibling, no change occurs.
   */
  const moveActionUp = (id: string) => {
    const newActions = deepCopyActions(actions);
    const targetContext = findNodeAndContext(newActions, id);

    if (!targetContext) return; // Node not found
    const { node: targetNode, siblingsArray, indexInSiblings } = targetContext;

    if (indexInSiblings === 0) {
      // Cannot move up if it's the first sibling
      // toast.info("Cannot move first item up.");
      return;
    }

    // Remove targetNode from its current position
    siblingsArray.splice(indexInSiblings, 1);
    // Insert targetNode one position before its original position
    siblingsArray.splice(indexInSiblings - 1, 0, targetNode);

    save(newActions);
  };

  /**
   * Moves an action down in its sibling list.
   * If it's already the last sibling, no change occurs.
   */
  const moveActionDown = (id: string) => {
    const newActions = deepCopyActions(actions);
    const targetContext = findNodeAndContext(newActions, id);

    if (!targetContext) return; // Node not found
    const { node: targetNode, siblingsArray, indexInSiblings } = targetContext;

    if (indexInSiblings === siblingsArray.length - 1) {
      // Cannot move down if it's the last sibling
      // toast.info("Cannot move last item down.");
      return;
    }

    // Remove targetNode from its current position
    siblingsArray.splice(indexInSiblings, 1);
    // Insert targetNode one position after its original position
    siblingsArray.splice(indexInSiblings + 1, 0, targetNode);

    save(newActions);
  };

  return {
    actions,
    loading,
    addAction,
    toggleAction,
    updateActionText,
    deleteAction,
    indentAction,
    outdentAction,
    moveActionUp,
    moveActionDown,
  };
};
