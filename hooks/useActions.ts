'use client';

import { useState, useCallback, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { ActionNode, fetchActions, updateActions } from '@/lib/supabase/actions';
import { useAuth } from './useAuth';

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
    setActions(newTree);
    if (isOwner && user) {
      try {
        await updateActions(user.id, newTree);
      } catch (error) {
        console.error("Failed to persist actions:", error);
        // In a real app, we might trigger a toast or revert state here
      }
    }
  }, [isOwner, user]);

  // --- CRUD Helpers (Recursive) ---

  const addAction = (description: string, parentId?: string) => {
    const addRecursive = (nodes: ActionNode[]): ActionNode[] => {
      if (!parentId) {
        return [
          ...nodes,
          {
            id: uuidv4(),
            description,
            completed: false,
            originalIndex: nodes.length,
            children: [],
            completed_at: undefined
          }
        ];
      }
      return nodes.map(node => {
        if (node.id === parentId) {
          return {
            ...node,
            children: [
              ...(node.children || []),
              {
                id: uuidv4(),
                description,
                completed: false,
                originalIndex: (node.children?.length || 0),
                children: [],
                completed_at: undefined
              }
            ]
          };
        } else if (node.children) {
          return { ...node, children: addRecursive(node.children) };
        }
        return node;
      });
    };
    save(addRecursive(actions));
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
        } else if (node.children) {
          return { ...node, children: toggleRecursive(node.children) };
        }
        return node;
      });
    };
    save(toggleRecursive(actions));
  };

  const updateActionText = (id: string, newText: string) => {
    const updateRecursive = (nodes: ActionNode[]): ActionNode[] => {
      return nodes.map(node => {
        if (node.id === id) {
          return { ...node, description: newText };
        } else if (node.children) {
          return { ...node, children: updateRecursive(node.children) };
        }
        return node;
      });
    };
    save(updateRecursive(actions));
  };

  const deleteAction = (id: string) => {
    const deleteRecursive = (nodes: ActionNode[]): ActionNode[] => {
      return nodes
        .filter(node => node.id !== id)
        .map(node => {
          if (node.children) {
            return { ...node, children: deleteRecursive(node.children) };
          }
          return node;
        });
    };
    save(deleteRecursive(actions));
  };

  return {
    actions,
    loading,
    addAction,
    toggleAction,
    updateActionText,
    deleteAction
  };
};
