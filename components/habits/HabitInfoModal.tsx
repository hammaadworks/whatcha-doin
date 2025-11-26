"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Habit } from "@/lib/supabase/types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2 } from "lucide-react";
import EditHabitModal from "./EditHabitModal";
import { useState } from "react";

interface HabitInfoModalProps {
  habit: Habit;
  isOpen: boolean;
  onClose: () => void;
  onHabitUpdated?: (
    habitId: string,
    name: string,
    isPublic: boolean,
    goalValue?: number | null,
    goalUnit?: string | null
  ) => void;
  onHabitDeleted?: (habitId: string) => void;
  isPrivateHabit?: boolean;
  canBeDeleted?: boolean;
}

const HabitInfoModal: React.FC<HabitInfoModalProps> = ({
  habit,
  isOpen,
  onClose,
  onHabitUpdated,
  onHabitDeleted,
  isPrivateHabit,
  canBeDeleted,
}) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const handleSave = (
    habitId: string,
    name: string,
    isPublic: boolean,
    goalValue?: number | null,
    goalUnit?: string | null
  ) => {
    onHabitUpdated?.(habitId, name, isPublic, goalValue, goalUnit);
    setIsEditModalOpen(false);
    onClose(); // Close info modal after saving
  };

  const handleDeleteClick = () => {
    if (window.confirm(`Are you sure you want to delete the habit "${habit.name}"? This action cannot be undone.`)) {
      onHabitDeleted?.(habit.id);
      onClose(); // Close info modal after deleting
    }
  };

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
        {isPrivateHabit && (
          <DialogFooter className="flex-row sm:justify-between sm:space-x-2 pt-4">
            <Button
              variant="outline"
              onClick={() => {
                setIsEditModalOpen(true);
                // Don't close info modal yet, EditHabitModal will handle it
              }}
              className="w-full"
            >
              <Pencil className="mr-2 h-4 w-4" /> Edit Habit
            </Button>
            {canBeDeleted && (
              <Button
                variant="destructive"
                onClick={handleDeleteClick}
                className="w-full"
              >
                <Trash2 className="mr-2 h-4 w-4" /> Delete Habit
              </Button>
            )}
          </DialogFooter>
        )}
      </DialogContent>
      {isPrivateHabit && (
        <EditHabitModal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          habit={habit}
          onSave={handleSave}
        />
      )}
    </Dialog>
  );
};

export default HabitInfoModal;
