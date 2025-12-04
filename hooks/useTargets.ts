'use client';

import {useEffect, useState} from 'react';
import {fetchTargets, updateTargets} from '@/lib/supabase/targets';
import {ActionNode} from '@/lib/supabase/types';
import {useAuth} from './useAuth';
import {toast} from 'sonner';
import {getMonthStartDate} from '@/lib/date';
import {
    addActionToTree,
    deleteActionFromTree,
    indentActionInTree,
    moveActionDownInTree,
    moveActionUpInTree,
    outdentActionInTree,
    toggleActionInTree,
    toggleActionPrivacyInTree,
    updateActionTextInTree,
} from '@/lib/utils/actionTreeUtils';
import {processTargetLifecycle} from '@/lib/logic/targetLifecycle';

export type TargetBucket = 'future' | 'current' | 'prev' | 'prev1';

// Helper to find a node recursively
const findNode = (nodes: ActionNode[], id: string): ActionNode | null => {
    for (const node of nodes) {
        if (node.id === id) return node;
        if (node.children) {
            const found = findNode(node.children, id);
            if (found) return found;
        }
    }
    return null;
};

export const useTargets = (isOwner: boolean, timezone: string = 'UTC', initialTargets?: ActionNode[]) => {
    const {user} = useAuth();

    const [futureTargets, setFutureTargets] = useState<ActionNode[]>([]);
    const [currentTargets, setCurrentTargets] = useState<ActionNode[]>(initialTargets || []); // Initialize with prop
    const [prevTargets, setPrevTargets] = useState<ActionNode[]>([]);
    const [prev1Targets, setPrev1Targets] = useState<ActionNode[]>([]);

    const [loading, setLoading] = useState(!initialTargets); // Loading if no initial data

    const getBucketState = (bucket: TargetBucket) => {
        switch (bucket) {
            case 'future':
                return {data: futureTargets, set: setFutureTargets, date: null};
            case 'current':
                return {data: currentTargets, set: setCurrentTargets, date: getMonthStartDate(0, timezone)};
            case 'prev':
                return {data: prevTargets, set: setPrevTargets, date: getMonthStartDate(-1, timezone)};
            case 'prev1':
                return {data: prev1Targets, set: setPrev1Targets, date: getMonthStartDate(-2, timezone)};
        }
    };

    useEffect(() => {
        // Only fetch if we don't have initial data AND we are owner (or we want to fetch for owner)
        // If initialTargets is passed, we assume it's for public view and we don't need to fetch.
        if (!initialTargets && isOwner && user) {
            setLoading(true);

            // Run lifecycle logic (rollover & clearing) before fetching
            processTargetLifecycle(user.id, timezone)
                .catch(err => console.error("Failed to process target lifecycle:", err))
                .finally(() => {
                    // Fetch updated state
                    Promise.all([fetchTargets(user.id, null), fetchTargets(user.id, getMonthStartDate(0, timezone)), fetchTargets(user.id, getMonthStartDate(-1, timezone)), fetchTargets(user.id, getMonthStartDate(-2, timezone)),])
                        .then(([future, current, prev, prev1]) => {
                            setFutureTargets(future);
                            setCurrentTargets(current);
                            setPrevTargets(prev);
                            setPrev1Targets(prev1);
                        })
                        .catch(err => console.error("Failed to fetch targets:", err))
                        .finally(() => setLoading(false));
                });
        }
    }, [isOwner, user, timezone, initialTargets]);

    const save = async (bucket: TargetBucket, newTree: ActionNode[]) => {
        const {set, date} = getBucketState(bucket);
        set(newTree);
        if (isOwner && user) {
            try {
                await updateTargets(user.id, date, newTree);
            } catch (error) {
                console.error(`Failed to save ${bucket} targets:`, error);
                toast.error("Failed to save target.");
            }
        }
    };

    const addTarget = (bucket: TargetBucket, description: string, parentId?: string) => {
        const {data} = getBucketState(bucket);
        save(bucket, addActionToTree(data, description, parentId, true));
    };

    const toggleTarget = (bucket: TargetBucket, id: string) => {
        const {data} = getBucketState(bucket);
        const newTree = toggleActionInTree(data, id);
        if (newTree === data) {
            toast.error("Complete sub-targets first!");
            return;
        }
        save(bucket, newTree);
    };

    const updateTargetText = (bucket: TargetBucket, id: string, newText: string) => {
        const {data} = getBucketState(bucket);
        save(bucket, updateActionTextInTree(data, id, newText));
    };

    const deleteTarget = (bucket: TargetBucket, id: string) => {
        const {data} = getBucketState(bucket);
        save(bucket, deleteActionFromTree(data, id));
    };

    const indentTarget = (bucket: TargetBucket, id: string) => {
        const {data} = getBucketState(bucket);
        save(bucket, indentActionInTree(data, id));
    };

    const outdentTarget = (bucket: TargetBucket, id: string) => {
        const {data} = getBucketState(bucket);
        save(bucket, outdentActionInTree(data, id));
    };

    const moveTargetUp = (bucket: TargetBucket, id: string) => {
        const {data} = getBucketState(bucket);
        save(bucket, moveActionUpInTree(data, id));
    };

    const moveTargetDown = (bucket: TargetBucket, id: string) => {
        const {data} = getBucketState(bucket);
        save(bucket, moveActionDownInTree(data, id));
    };

    const toggleTargetPrivacy = (bucket: TargetBucket, id: string) => {
        const {data} = getBucketState(bucket);
        save(bucket, toggleActionPrivacyInTree(data, id));
    };

    // Simple move: Removes from Source, Adds to Dest (Root)
    // Does NOT preserve children for now (simplified) or deep position.
    // Actually, reusing addActionToTree adds as a new node.
    const moveTargetToBucket = (fromBucket: TargetBucket, toBucket: TargetBucket, id: string) => {
        const source = getBucketState(fromBucket);
        const dest = getBucketState(toBucket);

        const node = findNode(source.data, id);
        if (!node) return;

        // Remove from source
        const newSourceTree = deleteActionFromTree(source.data, id);
        save(fromBucket, newSourceTree);

        // Add to dest (as new root node with same description)
        // NOTE: This loses children and completion status/timestamps.
        // For a proper move, we'd need `appendNodeToTree`.
        // For now, we'll just create a new one.
        save(toBucket, addActionToTree(dest.data, node.description, undefined, true));
        toast.success("Moved target!");
    };

    return {
        buckets: {
            future: futureTargets, current: currentTargets, prev: prevTargets, prev1: prev1Targets
        },
        loading,
        addTarget,
        toggleTarget,
        updateTargetText,
        deleteTarget,
        indentTarget,
        outdentTarget,
        moveTargetUp,
        moveTargetDown,
        toggleTargetPrivacy,
        moveTargetToBucket
    };
};
