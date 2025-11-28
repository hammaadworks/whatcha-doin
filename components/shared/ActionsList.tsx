"use client";

import { cn } from "@/lib/utils";
import { ActionItem } from "./ActionItem";

export interface Action {
  id: string;
  description: string;
  completed: boolean;
  children?: Action[]; 
  originalIndex: number;
  completed_at?: string; // Added for Next Day Clearing
}

interface ActionsListProps {
  actions: Action[];
  onActionToggled?: (id: string) => void;
  onActionAdded?: (description: string, parentId?: string) => void;
  onActionUpdated?: (id: string, newText: string) => void; // New prop
  onActionDeleted?: (id: string) => void; // New prop
  justCompletedId?: string | null;
  level?: number;
}

export const ActionsList: React.FC<ActionsListProps> = ({ 
  actions, 
  onActionToggled, 
  onActionAdded, 
  onActionUpdated,
  onActionDeleted,
  justCompletedId, 
  level = 0 
}) => {
  return (
    <div className={cn("grid grid-cols-1 gap-y-2")}>
      {actions.map((action) => (
        <ActionItem
          key={action.id}
          action={action}
          onActionToggled={onActionToggled}
          onActionAdded={onActionAdded}
          onActionUpdated={onActionUpdated}
          onActionDeleted={onActionDeleted}
          justCompletedId={justCompletedId}
          level={level}
        />
      ))}
    </div>
  );
};