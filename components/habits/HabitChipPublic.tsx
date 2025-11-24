"use client";

import React, { useState } from 'react';
import { Habit } from '@/lib/supabase/types';
import HabitInfoModal from './HabitInfoModal';
import { ShineBorder } from '../ui/shine-border';

interface HabitChipPublicProps {
  habit: Habit;
}

export const HabitChipPublic: React.FC<HabitChipPublicProps> = ({ habit }) => {
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);

  return (
    <>
      <div
        onClick={() => setIsInfoModalOpen(true)}
        className="group relative flex items-center gap-x-2 cursor-pointer rounded-full py-2.5 pl-5 pr-4 font-bold
                   border transition-colors w-fit
                 bg-[--chip-bg] text-[--chip-text] border-[--chip-border] hover:bg-[--secondary-bg]"
      >
        {/* Main content */}
        <div className="flex items-center gap-x-2">
          <span>{habit.name}</span>
          {/* Streak Counter */}
          <div
            className="inline-block rounded-[0.5rem] bg-primary px-2 py-1 text-[0.9rem] font-extrabold text-primary-foreground"
          >
            {habit.current_streak}
          </div>
        </div>
        <ShineBorder shineColor="hsl(var(--primary))" className="z-10" />
      </div>

      {/* Modal */}
      <HabitInfoModal
        isOpen={isInfoModalOpen}
        onClose={() => setIsInfoModalOpen(false)}
        habit={habit}
      />
    </>
  );
};