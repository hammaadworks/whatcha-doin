"use client";

import HabitCard from '@/components/habits/HabitCard';
import { HabitCreator } from '@/components/habits/HabitCreator';

export default function DashboardPage() {
  const dummyHabit = {
    id: 'habit-1',
    name: 'Drink Water',
    is_public: true,
    pile_state: 'lively',
    current_streak: 5,
    last_streak: 10,
    goal_value: 8,
    goal_unit: 'glasses',
  };

  const handleHabitUpdated = () => console.log('Habit updated (dummy)');
  const handleHabitDeleted = () => console.log('Habit deleted (dummy)');
  const handleHabitCreated = () => console.log('Habit created (dummy)'); // Dummy handler for HabitCreator

  return (
    <main className="flex min-h-screen flex-col items-center p-4 md:p-8 lg:p-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-7xl">
        {/* Bio and Todos Section (always two columns on desktop, stacked on mobile) */}
        <div className="col-span-1 md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="border p-4 rounded-lg shadow-sm" data-testid="bio-section">
            <h2 className="text-xl font-semibold mb-2">Bio</h2>
            <p>Your Bio Here</p>
          </div>
          <div className="border p-4 rounded-lg shadow-sm" data-testid="todos-section">
            <h2 className="text-xl font-semibold mb-2">Todos</h2>
            <p>Your Todos Here</p>
          </div>
        </div>

        {/* Today and Yesterday Section (Desktop: side-by-side, Mobile: stacked) */}
        <div className="col-span-1 md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="border p-4 rounded-lg shadow-sm" data-testid="today-section">
            <h2 className="text-xl font-semibold mb-2">Today</h2>
            <p>Today's Habits</p>
          </div>
          <div className="border p-4 rounded-lg shadow-sm" data-testid="yesterday-section">
            <h2 className="text-xl font-semibold mb-2">Yesterday</h2>
            <p>Yesterday's Habits</p>
          </div>
        </div>

        {/* The Pile Section (Full-width) */}
        <div className="col-span-1 md:col-span-2 border p-4 rounded-lg shadow-sm" data-testid="the-pile-section">
          <h2 className="text-xl font-semibold mb-2">The Pile</h2>
          <p>Habits in The Pile</p>
          <div className="mt-4 space-y-4">
            <HabitCreator onHabitCreated={handleHabitCreated} />
            <HabitCard
              habit={dummyHabit}
              onHabitUpdated={handleHabitUpdated}
              onHabitDeleted={handleHabitDeleted}
            />
          </div>
        </div>
      </div>
    </main>
  );
}