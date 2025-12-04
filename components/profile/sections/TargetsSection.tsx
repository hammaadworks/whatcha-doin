'use client';

import React, {useState} from 'react';
import {TargetBucket, useTargets} from '@/hooks/useTargets';
import {ActionsList} from '@/components/shared/ActionsList';
import {AddActionForm} from '@/components/shared/AddActionForm';
import {Tabs, TabsContent, TabsList, TabsTrigger} from '@/components/ui/tabs';
import {Skeleton} from '@/components/ui/skeleton';
import {format, parseISO} from 'date-fns';
import {getMonthStartDate} from '@/lib/date';
import {ActionNode} from '@/lib/supabase/types';

interface TargetsSectionProps {
    isOwner: boolean;
    isReadOnly?: boolean; // Add isReadOnly prop
    timezone: string;
    targets?: ActionNode[]; // Optional targets prop
}

export default function TargetsSection({
                                           isOwner,
                                           isReadOnly = false,
                                           timezone,
                                           targets: propTargets
                                       }: TargetsSectionProps) {
    const {
        buckets,
        loading,
        addTarget,
        toggleTarget,
        updateTargetText,
        deleteTarget,
        indentTarget,
        outdentTarget,
        moveTargetUp,
        moveTargetDown,
        toggleTargetPrivacy, // Add this
        moveTargetToBucket
    } = useTargets(isOwner, timezone, propTargets); // Pass propTargets to hook

    const [activeTab, setActiveTab] = useState<TargetBucket>('current');
    const [focusedActionId, setFocusedActionId] = useState<string | null>(null); // Add focus state

    // Date labels
    const currentMonthLabel = format(parseISO(getMonthStartDate(0, timezone)), 'MMM yyyy');
    const prevMonthLabel = format(parseISO(getMonthStartDate(-1, timezone)), 'MMM');
    const prev1MonthLabel = format(parseISO(getMonthStartDate(-2, timezone)), 'MMM');

    const renderTabContent = (bucket: TargetBucket) => {
        const actions = buckets[bucket];
        const canEdit = isOwner && !isReadOnly && (bucket === 'current' || bucket === 'future');

        // Flatten for ActionsList focus management (simplified here, passing empty if not focused)
        const flattened = flattenActionTree(actions);

        return (<div className="mt-4">
                <ActionsList
                    actions={actions}
                    onActionToggled={canEdit ? (id) => toggleTarget(bucket, id) : undefined}
                    onActionAdded={canEdit ? (desc, parentId) => addTarget(bucket, desc, parentId) : undefined}
                    onActionUpdated={canEdit ? (id, text) => updateTargetText(bucket, id, text) : undefined}
                    onActionDeleted={canEdit ? (id) => deleteTarget(bucket, id) : undefined}
                    onActionIndented={canEdit ? (id) => indentTarget(bucket, id) : undefined}
                    onActionOutdented={canEdit ? (id) => outdentTarget(bucket, id) : undefined}
                    onActionMovedUp={canEdit ? (id) => moveTargetUp(bucket, id) : undefined}
                    onActionMovedDown={canEdit ? (id) => moveTargetDown(bucket, id) : undefined}
                    onActionPrivacyToggled={canEdit ? (id) => toggleTargetPrivacy(bucket, id) : undefined} // Enable privacy toggle
                    flattenedActions={flattened}
                    focusedActionId={focusedActionId} // Pass focusedActionId
                    setFocusedActionId={setFocusedActionId} // Pass setFocusedActionId
                />

                {canEdit && (<div className="mt-4">
                        <AddActionForm
                            onSave={(desc) => addTarget(bucket, desc)}
                            onCancel={() => {
                            }} // Add dummy onCancel
                            placeholder={`Add target for ${bucket === 'future' ? 'Future' : 'this month'}...`}
                        />
                    </div>)}

                {/* Move to Current button for Future items */}
                {bucket === 'future' && isOwner && actions.length > 0 && !isReadOnly && ( // Only show if not read-only
                    <div className="mt-4 p-4 bg-muted/20 rounded-md border border-dashed">
                        <p className="text-xs text-muted-foreground mb-2">Move selected items to current month?</p>
                    </div>)}
            </div>);
    };

    if (loading) {
        return <Skeleton className="h-64 w-full"/>;
    }

    // If not owner and not read-only (shouldn't happen in public view, but safe guard)
    // Actually, if targets are empty and not owner, maybe hide?
    // But let's show empty state if that's desired.
    if (!isOwner && !isReadOnly) return null;

    return (<div className="space-y-4">
            <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-primary">Targets</h2>
            </div>

            <Tabs value={activeTab} onValueChange={(v: string) => setActiveTab(v as TargetBucket)} className="w-full">
                <TabsList className="grid w-full grid-cols-4">
                    <TabsTrigger value="prev1">{prev1MonthLabel}</TabsTrigger>
                    <TabsTrigger value="prev">{prevMonthLabel}</TabsTrigger>
                    <TabsTrigger value="current">{currentMonthLabel}</TabsTrigger>
                    <TabsTrigger value="future">Future</TabsTrigger>
                </TabsList>

                <TabsContent value="prev1">{renderTabContent('prev1')}</TabsContent>
                <TabsContent value="prev">{renderTabContent('prev')}</TabsContent>
                <TabsContent value="current">{renderTabContent('current')}</TabsContent>
                <TabsContent value="future">{renderTabContent('future')}</TabsContent>
            </Tabs>
        </div>);
}

// Helper (duplicated from ActionsSection, ideally move to utils)
const flattenActionTree = (nodes: ActionNode[]): ActionNode[] => {
    let flattened: ActionNode[] = [];
    nodes.forEach(node => {
        flattened.push(node);
        if (node.children && node.children.length > 0) {
            flattened = flattened.concat(flattenActionTree(node.children));
        }
    });
    return flattened;
};
