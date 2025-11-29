'use client';

import React, { useState, useEffect, useRef } from 'react';
import { ActionsList, Action } from '@/components/shared/ActionsList';
import { AddActionForm } from '@/components/shared/AddActionForm';
import { useActions } from '@/hooks/useActions';
import { mockPublicActionsData } from '@/lib/mock-data';
import { ActionNode } from '@/lib/supabase/actions';
import { CircularProgress } from '@/components/ui/circular-progress'; // Import CircularProgress

// Helper to recursively count total and completed actions
const getOverallCompletionCounts = (nodes: ActionNode[]): { total: number; completed: number } => {
  let total = 0;
  let completed = 0;

  nodes.forEach(node => {
    total++; // Count the current node
    if (node.completed) {
      completed++;
    }

    if (node.children && node.children.length > 0) {
      const childrenCounts = getOverallCompletionCounts(node.children);
      total += childrenCounts.total;
      completed += childrenCounts.completed;
    }
  });

  return { total, completed };
};

interface ActionsSectionProps {
  isOwner: boolean;
  actions?: Action[];
  timezone?: string;
  onActionToggled?: (id: string) => void;
  onActionAdded?: (description: string, parentId?: string) => void;
  justCompletedId?: string | null;
}

const ActionsSection: React.FC<ActionsSectionProps> = ({ isOwner, timezone, actions: propActions }) => {
  const {
    actions: hookActions,
    loading: hookLoading,
    addAction,
    toggleAction,
    updateActionText,
    deleteAction,
    indentAction,
    outdentAction,
    moveActionUp,
    moveActionDown
  } = useActions(isOwner, timezone);

  const addActionFormRef = useRef<{ focusInput: () => void; clearInput: () => void; isInputFocused: () => boolean; isInputEmpty: () => boolean }>(null);

  useEffect(() => {
    if (!isOwner) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      // Check for Ctrl+I or Cmd+I
      if ((event.metaKey || event.ctrlKey) && event.key === 'i') {
        event.preventDefault(); // Prevent browser's default behavior

        if (addActionFormRef.current) {
          if (addActionFormRef.current.isInputFocused()) {
            if (addActionFormRef.current.isInputEmpty()) {
              addActionFormRef.current.clearInput();
              addActionFormRef.current.focusInput(); // Keep focus but clear
            }
            // If input is focused and not empty, let the user type
          } else {
            addActionFormRef.current.focusInput();
          }
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOwner]);

  const displayActions = isOwner
    ? hookActions
    : (propActions as ActionNode[]) || (mockPublicActionsData as unknown as ActionNode[]);

  const { total: overallTotal, completed: overallCompleted } = getOverallCompletionCounts(displayActions);
  const overallProgressPercentage = overallTotal > 0 ? (overallCompleted / overallTotal) * 100 : 0;


  if (hookLoading && isOwner) {
    return <div className="p-4 text-center">Loading actions...</div>;
  }

  return (
    <div className="section mb-10">
      <div className="flex justify-between items-center border-b border-primary pb-4 mb-6">
        <h2 className="text-2xl font-extrabold flex items-center gap-3">
          Actions
          {overallTotal > 0 && (
            <CircularProgress
              progress={overallProgressPercentage}
              size={36} // Slightly smaller than individual items' circular progress
              strokeWidth={3}
              color="text-primary"
              bgColor="text-muted-foreground"
            >
              <span className="text-xs text-muted-foreground">{overallCompleted}/{overallTotal}</span>
            </CircularProgress>
          )}
        </h2>
      </div>
      <ActionsList
        actions={displayActions}
        onActionToggled={isOwner ? toggleAction : undefined}
        onActionAdded={isOwner ? addAction : undefined}
        onActionUpdated={isOwner ? updateActionText : undefined}
        onActionDeleted={isOwner ? deleteAction : undefined}
        onActionIndented={isOwner ? indentAction : undefined}
        onActionOutdented={isOwner ? outdentAction : undefined}
        onActionMovedUp={isOwner ? moveActionUp : undefined}
        onActionMovedDown={isOwner ? moveActionDown : undefined}
      />
      {isOwner && (
        <div className="mt-4">
          <AddActionForm
            ref={addActionFormRef}
            onSave={(desc) => {
              addAction(desc);
              addActionFormRef.current?.clearInput();
              addActionFormRef.current?.focusInput(); // Keep focus after saving
            }}
            onCancel={() => {
              addActionFormRef.current?.clearInput();
            }}
            placeholder="Add new action (Ctrl+I / Cmd+I)"
            autoFocusOnMount={false} // Prevent auto-focus on initial render
          />
        </div>
      )}
    </div>
  );
};

export default ActionsSection;
