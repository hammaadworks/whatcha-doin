"use client";

import React, { useState } from 'react';
import { Pencil, Trash2 } from 'lucide-react';
import { Habit } from '@/lib/supabase/types';
import EditHabitModal from './EditHabitModal';
import { HabitChipPublic } from './HabitChipPublic';

interface HabitChipPrivateProps {
  habit: Habit;
  onHabitUpdated: (
    habitId: string,
    name: string,
    isPublic: boolean,
    goalValue?: number | null,
    goalUnit?: string | null
  ) => void;
  onHabitDeleted: (habitId: string) => void;
  columnId?: 'today' | 'yesterday' | 'pile';
}

export const HabitChipPrivate: React.FC<HabitChipPrivateProps> = ({
  habit,
  onHabitUpdated,
  onHabitDeleted,
  columnId,
}) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const handleSave = (
    habitId: string,
    name: string,
    isPublic: boolean,
    goalValue?: number | null,
    goalUnit?: string | null
  ) => {
    onHabitUpdated(habitId, name, isPublic, goalValue, goalUnit);
    setIsEditModalOpen(false);
  };

  const handleDeleteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (window.confirm(`Are you sure you want to delete the habit "${habit.name}"? This action cannot be undone.`)) {
      onHabitDeleted(habit.id);
    }
  };
  
  const handleEditClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsEditModalOpen(true);
  };

  const canBeDeleted = columnId === 'pile';

  return (
    <>
      <div className="group relative w-fit">
        {/* The public chip provides the base visuals and the info modal functionality */}
        <HabitChipPublic habit={habit} />
        
        {/* The private controls are layered on top and appear on hover */}
        <div className="absolute inset-0 flex items-center justify-end pr-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <div className="flex items-center bg-[--chip-bg] rounded-full h-full px-1">
            <button
              onClick={handleEditClick}
              className="rounded-full p-1.5 hover:bg-gray-500/20"
              title="Edit Habit"
            >
              <Pencil size={16} />
            </button>
            {canBeDeleted && (
              <button
                onClick={handleDeleteClick}
                className="rounded-full p-1.5 text-red-500 hover:bg-red-500/20"
                title="Delete Habit"
              >
                <Trash2 size={16} />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* The Edit Modal is still managed by this private component */}
      <EditHabitModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        habit={habit}
        onSave={handleSave}
      />
    </>
  );
};
