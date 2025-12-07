'use client';

import React, { useState, useCallback, useRef } from 'react';
import { SparklesText } from '@/components/ui/sparkles-text';
import { cn } from '@/lib/utils';
import { AnimatePresence, motion } from "framer-motion";

interface MotivationsSectionProps {
    username: string;
    isOwner: boolean;
    isReadOnly?: boolean; 
    loading: boolean;
}

const MotivationsSection: React.FC<MotivationsSectionProps> = ({loading}) => {
    const [isInteracting, setIsInteracting] = useState(false);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    const handleInteraction = useCallback(() => {
        setIsInteracting(true);
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        timeoutRef.current = setTimeout(() => {
            setIsInteracting(false);
        }, 2000);
    }, []);

    if (loading) return null;

    return (
        <div 
            className="flex flex-col items-center justify-center py-6 px-4 w-full text-center group select-none cursor-default"
            onMouseEnter={handleInteraction}
            onClick={handleInteraction}
            onTouchStart={handleInteraction}
        >
            <div className="relative max-w-4xl">
                 {/* Decorative large quote mark */}
                <span className={cn(
                    "absolute -top-10 -left-12 text-9xl font-serif leading-none select-none pointer-events-none transition-all duration-700",
                    "text-primary/30 translate-y-0 opacity-100", // Muted color as requested
                    isInteracting ? "scale-110 text-primary/40" : "scale-100"
                )}>
                    &ldquo;
                </span>

                <SparklesText
                    className={cn(
                        "text-xl md:text-2xl lg:text-3xl font-medium leading-relaxed italic tracking-wide transition-all duration-500",
                        "text-primary", // Default text color
                        isInteracting && "text-primary", // Highlight on interaction
                        "font-serif" 
                    )}
                    colors={{ first: "var(--primary)", second: "var(--accent)" }} // Use theme colors, avoid black
                    sparklesCount={12}
                    active={isInteracting}
                >
                    Work on your dreams as if your life depends on it. Because it does.
                </SparklesText>

                <div className="h-8 mt-4 overflow-hidden relative w-full flex justify-center">
                    <AnimatePresence>
                        {isInteracting && (
                            <motion.footer
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 10 }}
                                transition={{ duration: 0.4, ease: "easeOut" }}
                                className="text-sm font-semibold tracking-widest text-muted-foreground uppercase"
                            >
                                — Unknown
                            </motion.footer>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
};

export default MotivationsSection;