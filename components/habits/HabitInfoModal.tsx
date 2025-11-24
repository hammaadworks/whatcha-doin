"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Habit } from "@/lib/supabase/types";
import { Badge } from "@/components/ui/badge";

interface HabitInfoModalProps {
  habit: Habit;
  isOpen: boolean;
  onClose: () => void;
}

const HabitInfoModal: React.FC<HabitInfoModalProps> = ({
  habit,
  isOpen,
  onClose,
}) => {
  if (!isOpen) {
    return null;
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">{habit.name}</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="flex justify-between items-center">
            <span className="text-muted-foreground">Current Streak</span>
            <Badge variant="default" className="text-lg">
              🔥 {habit.current_streak}
            </Badge>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-muted-foreground">Longest Streak</span>
            <span className="font-semibold">{habit.last_streak} days</span>
          </div>
          {habit.goal_value && habit.goal_unit && (
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Goal</span>
              <span className="font-semibold">
                {habit.goal_value} {habit.goal_unit}
              </span>
            </div>
          )}
          <div className="flex justify-between items-center">
            <span className="text-muted-foreground">Status</span>
            <span className="font-semibold capitalize">
              {habit.is_public ? "Public 🌐" : "Private 🔒"}
            </span>
          </div>
           <div className="flex justify-between items-center">
            <span className="text-muted-foreground">State</span>
            <span className="font-semibold capitalize">{habit.pile_state}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-muted-foreground">Created</span>
            <span className="font-semibold">
              {new Date(habit.created_at).toLocaleDateString()}
            </span>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default HabitInfoModal;
