"use client";

import { cn } from "@/lib/utils";
import { ActionItem } from "./ActionItem";

export interface Action {
  id: string;
  description: string;
  completed: boolean;
  children?: Action[]; 
  originalIndex?: number;
  completed_at?: string; // Added for Next Day Clearing
}

interface ActionsListProps {
  actions: Action[];
  onActionToggled?: (id: string) => void;
  onActionAdded?: (description: string, parentId?: string) => void;
  onActionUpdated?: (id: string, newText: string) => void;
  onActionDeleted?: (id: string) => void;
  onActionIndented?: (id: string) => void;
  onActionOutdented?: (id: string) => void;
  onActionMovedUp?: (id: string) => void;
  onActionMovedDown?: (id: string) => void;
  justCompletedId?: string | null;
  level?: number;
}

export const ActionsList: React.FC<ActionsListProps> = ({ 
  actions, 
  onActionToggled, 
  onActionAdded, 
  onActionUpdated,
  onActionDeleted,
  onActionIndented,
  onActionOutdented,
  onActionMovedUp,
  onActionMovedDown,
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
          onActionIndented={onActionIndented}
          onActionOutdented={onActionOutdented}
          onActionMovedUp={onActionMovedUp}
          onActionMovedDown={onActionMovedDown}
          justCompletedId={justCompletedId}
          level={level}
        />
      ))}
    </div>
  );
};