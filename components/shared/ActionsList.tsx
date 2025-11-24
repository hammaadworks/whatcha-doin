"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

interface Action {
  id: string;
  description: string;
  completed: boolean;
}

interface ActionsListProps {
  actions: Action[];
  onActionToggled?: (id: string) => void;
  justCompletedId?: string | null;
}

export const ActionsList: React.FC<ActionsListProps> = ({ actions, onActionToggled, justCompletedId }) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      {actions.map((action) => {
        const labelClasses = cn(
          "text-base font-medium text-foreground cursor-pointer",
          {
            "line-through": action.completed,
            "text-muted-foreground": action.completed && !!onActionToggled,
          }
        );

        return (
          <div
            key={action.id}
            className={cn(
              "flex items-center space-x-3 p-3 rounded-md bg-card border border-card-border shadow-sm transition-all duration-300",
              {
                "bg-primary/20 scale-95": justCompletedId === action.id,
              }
            )}
          >
            <Checkbox
              id={action.id}
              checked={action.completed}
              onCheckedChange={() => onActionToggled && onActionToggled(action.id)}
              className={cn("h-5 w-5 rounded-sm", { "pointer-events-none": !onActionToggled })}
            />
            <Label
              htmlFor={action.id}
              className={labelClasses}
            >
              {action.description}
            </Label>
          </div>
        );
      })}
    </div>
  );
};
