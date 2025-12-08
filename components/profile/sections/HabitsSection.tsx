'use client';

import React, {useEffect, useState} from 'react';
import {HabitChipPrivate} from '@/components/habits/HabitChipPrivate';
import {HabitChipPublic} from '@/components/habits/HabitChipPublic';
import {mockHabitsData, mockPublicHabitsData} from '@/lib/mock-data';
import {MovingBorder} from '@/components/ui/moving-border';
import {Button} from '@/components/ui/button';
import {Habit} from '@/lib/supabase/types'; // Import Habit
import {Skeleton} from '@/components/ui/skeleton'; // Import Skeleton
import {completeHabit, deleteHabit, updateHabit, unmarkHabit} from '@/lib/supabase/habit'; // Import update/delete/complete functions
import {toast} from 'sonner';
import {CompletionData} from '@/components/habits/HabitCompletionModal';
import {Plus} from 'lucide-react';
import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger,} from "@/components/ui/tooltip"; // New import
import {HabitCreatorModal} from '@/components/habits/HabitCreatorModal'; // New import
import {
    DndContext,
    DragEndEvent,
    DragOverlay,
    DragStartEvent,
    PointerSensor,
    TouchSensor,
    useDroppable,
    useSensor,
    useSensors,
    closestCorners
} from '@dnd-kit/core';
import {SortableContext, rectSortingStrategy} from '@dnd-kit/sortable';
import {SortableHabit} from '@/components/habits/SortableHabit';

import {useAuth} from '@/hooks/useAuth';

interface HabitsSectionProps {
    isOwner: boolean;
    isReadOnly?: boolean; // Add isReadOnly prop
    habits?: Habit[]; // Add habits prop
    loading: boolean; // Add loading prop
    onActivityLogged?: () => void; // New prop for journal refresh
}

function DroppableColumn({id, children, className}: { id: string, children: React.ReactNode, className?: string }) {
    const {setNodeRef} = useDroppable({id});
    return (
        <div ref={setNodeRef} className={className}>
            {children}
        </div>
    );
}

const HabitsSection: React.FC<HabitsSectionProps> = ({
                                                         isOwner,
                                                         isReadOnly = false,
                                                         habits: propHabits,
                                                         loading,
                                                         onActivityLogged
                                                     }) => {
    const {user} = useAuth();
    // Initialize local state for habits to handle optimistic UI updates during DnD
    const [optimisticHabits, setOptimisticHabits] = useState<Habit[] | null>(null);
    const [prevPropHabits, setPrevPropHabits] = useState(propHabits);

    // Reset optimistic state when props change (Render-time update)
    if (propHabits !== prevPropHabits) {
        setPrevPropHabits(propHabits);
        setOptimisticHabits(null);
    }

    const baseHabits = propHabits ? propHabits : (isOwner ? mockHabitsData : mockPublicHabitsData);
    const habits = optimisticHabits || baseHabits;

    const todayHabits = habits.filter(h => h.pile_state === 'today');
    const yesterdayHabits = habits.filter(h => h.pile_state === 'yesterday');
    const pileHabits = habits.filter(h => h.pile_state === 'lively' || h.pile_state === 'junked' || h.pile_state === 'pile' || h.pile_state === 'active');

    const HabitChipComponent = isOwner ? HabitChipPrivate : HabitChipPublic;

    const [showAllPileHabits, setShowAllPileHabits] = useState(false);
    const initialVisibleHabits = 4; // Approximately 2 lines of chips

    const habitsToDisplay = showAllPileHabits ? pileHabits : pileHabits.slice(0, initialVisibleHabits);
    const hasMoreHabits = pileHabits.length > initialVisibleHabits;

    const [activeId, setActiveId] = useState<string | null>(null);
    const [activeHabit, setActiveHabit] = useState<Habit | null>(null);

    const sensors = useSensors(
        useSensor(PointerSensor, {activationConstraint: {distance: 8}}),
        useSensor(TouchSensor)
    );

    const handleDragStart = (event: DragStartEvent) => {
        setActiveId(event.active.id as string);
        const habit = habits.find(h => h.id === event.active.id);
        setActiveHabit(habit || null);
    };

    const handleDragEnd = async (event: DragEndEvent) => {
        const {active, over} = event;
        setActiveId(null);
        setActiveHabit(null);

        if (!over) return;

        const habitId = active.id as string;
        const overId = over.id as string;

        // Determine target column
        let targetColumn = overId;
        // If dropped over a habit, find that habit's column
        if (!['today', 'yesterday', 'pile'].includes(overId)) {
            const overHabit = habits.find(h => h.id === overId);
            if (overHabit) {
                // Map pile states to column IDs
                if (overHabit.pile_state === 'today') targetColumn = 'today';
                else if (overHabit.pile_state === 'yesterday') targetColumn = 'yesterday';
                else targetColumn = 'pile';
            }
        }

        const habit = habits.find(h => h.id === habitId);
        if (!habit) return;

        // Determine source column
        let sourceColumn = 'pile';
        if (habit.pile_state === 'today') sourceColumn = 'today';
        else if (habit.pile_state === 'yesterday') sourceColumn = 'yesterday';

        if (sourceColumn === targetColumn) return;

        // Optimistic Update
        // Ensure we are working with a new array for optimistic updates
        const newHabits = habits.map(h => {
             if (h.id === habitId) {
                let newPileState = targetColumn;
                if (targetColumn === 'pile') newPileState = 'pile'; 
                return {...h, pile_state: newPileState};
            }
            return h;
        });
        setOptimisticHabits(newHabits);

        try {
            if (sourceColumn === 'today' && (targetColumn === 'yesterday' || targetColumn === 'pile')) {
                // Unmark Flow
                if (window.confirm("Are you sure you want to unmark?")) {
                    await unmarkHabit(habitId, targetColumn);
                    onActivityLogged?.();
                } else {
                    // Revert optimistic update if cancelled
                    setOptimisticHabits(null); // Or revert to previousHabits if we were chaining updates, but here we just reset
                }
            } else {
                // Standard Move
                await updateHabit(habitId, {pile_state: targetColumn});
                onActivityLogged?.();
            }
            toast.success(`Moved to ${targetColumn}`);
        } catch (error) {
            console.error("Move failed", error);
            toast.error("Failed to move habit");
            setOptimisticHabits(null); // Revert on error
        }
    };


    const handleHabitUpdate = async (habitId: string, name: string, isPublic: boolean, goalValue?: number | null, goalUnit?: string | null) => {
        try {
            await updateHabit(habitId, {name, is_public: isPublic, goal_value: goalValue, goal_unit: goalUnit});
            toast.success('Habit updated');
            onActivityLogged?.();
        } catch (error) {
            console.error('Failed to update habit:', error);
            toast.error('Failed to update habit');
        }
    };

    const handleHabitDelete = async (habitId: string) => {
        try {
            await deleteHabit(habitId);
            toast.success('Habit deleted');
            // Remove locally
            setOptimisticHabits(habits.filter(h => h.id !== habitId));
            onActivityLogged?.();
        } catch (error) {
            console.error('Failed to delete habit:', error);
            toast.error('Failed to delete habit');
        }
    };

    const [isCreateHabitModalOpen, setIsCreateHabitModalOpen] = useState(false);

    const handleCreateHabit = () => {
        setIsCreateHabitModalOpen(false);
        toast.success('Habit created!');
        onActivityLogged?.();
    };

    const handleHabitComplete = async (habitId: string, data: CompletionData) => {
        try {
            await completeHabit(habitId, data);
            toast.success('Habit completed! 🔥');
            onActivityLogged?.(); // Trigger journal refresh
        } catch (error) {
            console.error('Failed to complete habit:', error);
            toast.error('Failed to complete habit');
        }
    };

    // Define no-op functions with correct signatures for read-only mode
    const noopOnHabitUpdated = (_habitId: string, _name: string, _isPublic: boolean, _goalValue?: number | null, _goalUnit?: string | null) => {
    };
    const noopOnHabitDeleted = (_habitId: string) => {
    };
    const noopOnHabitCompleted = (_habitId: string, _data: CompletionData) => {
    };

    if (loading) {
        return (<div className="section mb-10">
            <h2 className="text-2xl font-extrabold border-b border-primary pb-4 mb-6 text-foreground">Habits</h2>
            <div className="flex flex-wrap gap-2">
                <Skeleton className="h-10 w-32"/>
                <Skeleton className="h-10 w-40"/>
                <Skeleton className="h-10 w-24"/>
                <Skeleton className="h-10 w-36"/>
                <Skeleton className="h-10 w-28"/>
                <Skeleton className="h-10 w-48"/>
            </div>
        </div>);
    }

    return (<div className="section mb-10">
        <div className="flex justify-between items-center border-b border-primary pb-4 mb-6">
            <h2 className="text-2xl font-extrabold text-primary">Habits</h2>
            {isOwner && !isReadOnly && (<TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button
                                variant="ghost"
                                size="icon"
                                className="relative inline-flex h-10 w-10 items-center justify-center rounded-full bg-background text-muted-foreground ring-offset-background transition-colors ring-2 ring-primary hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                                onClick={() => setIsCreateHabitModalOpen(true)}
                                title="Add New Habit">
                                <Plus className="h-4 w-4"/>
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent>Add New Habit</TooltipContent>
                    </Tooltip>
                </TooltipProvider>)}
        </div>
        
        <DndContext 
            sensors={sensors} 
            collisionDetection={closestCorners} 
            onDragStart={handleDragStart} 
            onDragEnd={handleDragEnd}
        >
        {isOwner ? (<>
            {/* Mobile Layout */}
            <div className="md:hidden flex flex-col gap-4">
                {/* Today Column - Mobile */}
                <div className="relative overflow-hidden rounded-xl shadow">
                    <DroppableColumn id="today" className="p-4 bg-background border border-primary rounded-xl z-10 relative min-h-[100px]">
                        <h3 className="text-xl font-semibold mb-4 text-foreground">Today</h3>
                        <SortableContext items={todayHabits.map(h => h.id)} strategy={rectSortingStrategy}>
                            <div className="flex flex-wrap gap-2">
                                {todayHabits.length > 0 ? todayHabits.map(h => (
                                    <SortableHabit key={h.id} id={h.id} disabled={isReadOnly}>
                                        <HabitChipComponent habit={h}
                                                            onHabitUpdated={!isReadOnly ? handleHabitUpdate : noopOnHabitUpdated}
                                                            onHabitDeleted={!isReadOnly ? handleHabitDelete : noopOnHabitDeleted}
                                                            onHabitCompleted={!isReadOnly ? handleHabitComplete : noopOnHabitCompleted}
                                                            columnId="today"/>
                                    </SortableHabit>
                                )) : (!activeId && <p className="text-muted-foreground text-sm">No habits for today.</p>)}
                            </div>
                        </SortableContext>
                    </DroppableColumn>
                    <div className="absolute inset-0 rounded-[inherit] z-20 pointer-events-none">
                        <MovingBorder duration={8000} rx="6" ry="6">
                            <div
                                className="h-1 w-8 bg-[radial-gradient(var(--primary)_60%,transparent_100%)] opacity-100 shadow-[0_0_25px_var(--primary)]"/>
                        </MovingBorder>
                    </div>
                </div>

                {/* Yesterday Column - Mobile */}
                {/* Yesterday Column - Mobile */}
                <DroppableColumn id="yesterday" className={`p-4 bg-background border border-card-border rounded-xl shadow relative overflow-hidden min-h-[100px] ${yesterdayHabits.length > 0 ? 'border-orange-500/50 bg-orange-500/5' : ''}`}>
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-xl font-semibold text-foreground">Yesterday</h3>
                         {yesterdayHabits.length > 0 && <span className="text-xs text-orange-500 font-bold animate-pulse">Complete to save streak!</span>}
                    </div>
                    <SortableContext items={yesterdayHabits.map(h => h.id)} strategy={rectSortingStrategy}>
                        <div className="flex flex-wrap gap-2">
                            {yesterdayHabits.length > 0 ? yesterdayHabits.map(h => (
                                <SortableHabit key={h.id} id={h.id} disabled={isReadOnly}>
                                    <HabitChipComponent habit={h}
                                                        onHabitUpdated={!isReadOnly ? handleHabitUpdate : noopOnHabitUpdated}
                                                        onHabitDeleted={!isReadOnly ? handleHabitDelete : noopOnHabitDeleted}
                                                        onHabitCompleted={!isReadOnly ? handleHabitComplete : noopOnHabitCompleted}
                                                        columnId="yesterday"/>
                                </SortableHabit>
                            )) : (!activeId && <p className="text-muted-foreground text-sm">No habits from yesterday.</p>)}
                        </div>
                    </SortableContext>
                </DroppableColumn>

                {/* The Pile Column - Mobile */}
                <DroppableColumn id="pile" className="p-4 bg-background border border-card-border rounded-xl shadow relative overflow-hidden min-h-[100px]">
                    <h3 className="text-xl font-semibold mb-4 text-foreground">The Pile</h3>
                    <SortableContext items={habitsToDisplay.map(h => h.id)} strategy={rectSortingStrategy}>
                        <div className="flex flex-wrap gap-2">
                            {habitsToDisplay.length > 0 ? habitsToDisplay.map(h => (
                                <SortableHabit key={h.id} id={h.id} disabled={isReadOnly}>
                                    <HabitChipComponent habit={h}
                                                        onHabitUpdated={!isReadOnly ? handleHabitUpdate : noopOnHabitUpdated}
                                                        onHabitDeleted={!isReadOnly ? handleHabitDelete : noopOnHabitDeleted}
                                                        onHabitCompleted={!isReadOnly ? handleHabitComplete : noopOnHabitCompleted}
                                                        columnId="pile"/>
                                </SortableHabit>
                            )) : (!activeId && <p className="text-muted-foreground text-sm">The Pile is empty.</p>)}
                        </div>
                    </SortableContext>
                    {hasMoreHabits && (<Button
                        variant="ghost"
                        onClick={() => setShowAllPileHabits(!showAllPileHabits)}
                        className="mt-2 w-full"
                    >
                        {showAllPileHabits ? 'Show Less' : 'Show More'}
                    </Button>)}
                </DroppableColumn>
            </div>

            {/* Desktop Layout */}
            <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-2 gap-4">
                {/* Today Column */}
                <div className="relative overflow-hidden rounded-xl shadow">
                    <DroppableColumn id="today" className="p-4 bg-background border border-primary rounded-xl z-10 relative min-h-[100px]">
                        <h3 className="text-xl font-semibold mb-4 text-foreground">Today</h3>
                        <SortableContext items={todayHabits.map(h => h.id)} strategy={rectSortingStrategy}>
                            <div className="flex flex-wrap gap-2">
                                {todayHabits.length > 0 ? todayHabits.map(h => (
                                    <SortableHabit key={h.id} id={h.id} disabled={isReadOnly}>
                                        <HabitChipComponent habit={h}
                                                            onHabitUpdated={!isReadOnly ? handleHabitUpdate : noopOnHabitUpdated}
                                                            onHabitDeleted={!isReadOnly ? handleHabitDelete : noopOnHabitDeleted}
                                                            onHabitCompleted={!isReadOnly ? handleHabitComplete : noopOnHabitCompleted}
                                                            columnId="today"/>
                                    </SortableHabit>
                                )) : (!activeId && <p className="text-muted-foreground text-sm">No habits for today.</p>)}
                            </div>
                        </SortableContext>
                    </DroppableColumn>
                    <div className="absolute inset-0 rounded-[inherit] z-20 pointer-events-none">
                        <MovingBorder duration={8000} rx="6" ry="6">
                            <div
                                className="h-1 w-8 bg-[radial-gradient(var(--primary)_60%,transparent_100%)] opacity-100 shadow-[0_0_25px_var(--primary)]"/>
                        </MovingBorder>
                    </div>
                </div>

                {/* Yesterday Column */}
                <DroppableColumn id="yesterday" className={`p-4 bg-background border border-card-border rounded-xl shadow relative overflow-hidden min-h-[100px] ${yesterdayHabits.length > 0 ? 'border-orange-500/50 bg-orange-500/5' : ''}`}>
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-xl font-semibold text-foreground">Yesterday</h3>
                         {yesterdayHabits.length > 0 && <span className="text-xs text-orange-500 font-bold animate-pulse">Complete to save streak!</span>}
                    </div>
                    <SortableContext items={yesterdayHabits.map(h => h.id)} strategy={rectSortingStrategy}>
                        <div className="flex flex-wrap gap-2">
                            {yesterdayHabits.length > 0 ? yesterdayHabits.map(h => (
                                <SortableHabit key={h.id} id={h.id} disabled={isReadOnly}>
                                    <HabitChipComponent habit={h}
                                                        onHabitUpdated={!isReadOnly ? handleHabitUpdate : noopOnHabitUpdated}
                                                        onHabitDeleted={!isReadOnly ? handleHabitDelete : noopOnHabitDeleted}
                                                        onHabitCompleted={!isReadOnly ? handleHabitComplete : noopOnHabitCompleted}
                                                        columnId="yesterday"/>
                                </SortableHabit>
                            )) : (!activeId && <p className="text-muted-foreground text-sm">No habits from yesterday.</p>)}
                        </div>
                    </SortableContext>
                </DroppableColumn>

                {/* The Pile Column */}
                <DroppableColumn id="pile" className="p-4 bg-background border border-card-border rounded-xl shadow md:col-span-full lg:col-span-2 min-h-[100px]">
                    <h3 className="text-xl font-semibold mb-4 text-foreground">The Pile</h3>
                    <SortableContext items={pileHabits.map(h => h.id)} strategy={rectSortingStrategy}>
                        <div className="flex flex-wrap gap-2">
                            {pileHabits.length > 0 ? pileHabits.map(h => (
                                <SortableHabit key={h.id} id={h.id} disabled={isReadOnly}>
                                    <HabitChipComponent habit={h}
                                                        onHabitUpdated={!isReadOnly ? handleHabitUpdate : noopOnHabitUpdated}
                                                        onHabitDeleted={!isReadOnly ? handleHabitDelete : noopOnHabitDeleted}
                                                        onHabitCompleted={!isReadOnly ? handleHabitComplete : noopOnHabitCompleted}
                                                        columnId="pile"/>
                                </SortableHabit>
                            )) : (!activeId && <p className="text-muted-foreground text-sm">The Pile is empty.</p>)}
                        </div>
                    </SortableContext>
                </DroppableColumn>
            </div>
        </>) : (// Public view for habits
            <div className="habit-grid flex flex-wrap gap-4">
                {habits.filter(h => h.is_public).map((habit) => (<HabitChipPublic key={habit.id} habit={habit}/>))}
            </div>)}
            
            <DragOverlay>
                {activeHabit ? (
                    <HabitChipComponent habit={activeHabit}
                                        onHabitUpdated={noopOnHabitUpdated}
                                        onHabitDeleted={noopOnHabitDeleted}
                                        onHabitCompleted={noopOnHabitCompleted}
                                        columnId="today" // Visual placeholder column
                    />
                ) : null}
            </DragOverlay>
        </DndContext>

        {isOwner && !isReadOnly && (<HabitCreatorModal
                isOpen={isCreateHabitModalOpen}
                onClose={() => setIsCreateHabitModalOpen(false)}
                onHabitCreated={handleCreateHabit}
            />)}
    </div>);
};

export default HabitsSection;