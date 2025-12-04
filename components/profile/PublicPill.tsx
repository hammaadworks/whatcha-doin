// components/profile/PublicPill.tsx
"use client";

import React from 'react';
import {cn} from '@/lib/utils';

interface PublicPillProps {
    currentViewMode: 'edit' | 'private' | 'public';
    onViewModeChange: (mode: 'edit' | 'private' | 'public') => void;
}

export const PublicPill: React.FC<PublicPillProps> = ({currentViewMode, onViewModeChange}) => {
    const buttonClass = "px-3 py-1 text-xs sm:text-sm font-medium rounded-full whitespace-nowrap"; // Adjusted padding and font size for better fit

    return (<div className="absolute -top-3 left-4 z-10">
            <div className="flex items-center justify-center bg-card rounded-full p-1 shadow-md border border-border">
                <button
                    type="button"
                    className={cn(buttonClass, currentViewMode === 'edit' ? "bg-muted text-foreground" : "text-muted-foreground hover:bg-muted")}
                    onClick={() => onViewModeChange('edit')}
                >
                    Edit
                </button>
                <button
                    type="button"
                    className={cn(buttonClass, currentViewMode === 'private' ? "bg-muted text-foreground" : "text-muted-foreground hover:bg-muted")}
                    onClick={() => onViewModeChange('private')}
                >
                    Preview Private
                </button>
                <button
                    type="button"
                    className={cn(buttonClass, currentViewMode === 'public' ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-muted")}
                    onClick={() => onViewModeChange('public')}
                >
                    Preview Public
                </button>
            </div>
        </div>);
};
