'use client';

import React, { useState } from 'react';
import { ActionsList, Action } from '@/components/shared/ActionsList';
import { Button } from '@/components/ui/button';
import { AddActionForm } from '@/components/shared/AddActionForm';
import { useActions } from '@/hooks/useActions';
import { mockPublicActionsData } from '@/lib/mock-data';
import { ActionNode } from '@/lib/supabase/actions';

interface ActionsSectionProps {
  isOwner: boolean;
  actions?: Action[]; 
  timezone?: string; 
  onActionToggled?: (id: string) => void;
  onActionAdded?: (description: string, parentId?: string) => void;
  justCompletedId?: string | null;
}

const ActionsSection: React.FC<ActionsSectionProps> = ({ isOwner, timezone, actions: propActions }) => {
  // Use the new robust hook for logic management
  const { 
    actions: hookActions, 
    loading: hookLoading, 
    addAction, 
    toggleAction, 
    updateActionText, 
    deleteAction 
  } = useActions(isOwner, timezone);

  const [isAdding, setIsAdding] = useState(false);

  // Decide which actions to display:
  // 1. If Owner: Use the hook's state (which syncs with Supabase).
  // 2. If Public (and props provided): Use the props passed down from the page.
  // 3. Fallback: Mock public data.
  const displayActions = isOwner 
    ? hookActions 
    : (propActions as ActionNode[]) || (mockPublicActionsData as unknown as ActionNode[]);

  if (hookLoading && isOwner) {
    return <div className="p-4 text-center">Loading actions...</div>;
  }

  return (
    <div className="section mb-10">
      <div className="flex justify-between items-center border-b border-primary pb-4 mb-6">
        <h2 className="text-2xl font-extrabold">Actions</h2>
        {isOwner && (
          <Button onClick={() => setIsAdding(true)}>Add Action</Button>
        )}
      </div>
      {isAdding && (
        <div className="mb-4">
          <AddActionForm onSave={(desc) => { addAction(desc); setIsAdding(false); }} onCancel={() => setIsAdding(false)} />
        </div>
      )}
      <ActionsList 
        actions={displayActions} 
        onActionToggled={isOwner ? toggleAction : undefined} 
        onActionAdded={isOwner ? addAction : undefined}
        onActionUpdated={isOwner ? updateActionText : undefined}
        onActionDeleted={isOwner ? deleteAction : undefined}
      />
    </div>
  );
};

export default ActionsSection;
