'use client';

import React, { useState, useCallback, useRef } from 'react';
import { SparklesText } from '@/components/ui/sparkles-text';
import { cn } from '@/lib/utils';
import { AnimatePresence, motion } from "framer-motion";
import { Shuffle, Pencil } from 'lucide-react';
import { Button } from '@/components/ui/button';
import CustomQuotesModal from '@/components/profile/CustomQuotesModal';

interface MotivationsSectionProps {
    username: string;
    isOwner: boolean;
    isReadOnly?: boolean; 
    loading: boolean;
    onShuffle?: () => void;
    // onCustom prop is no longer needed to be passed from parent if handled internally, 
    // but we'll keep it compatible or just ignore it if we handle modal here.
    // Actually, sticking to the component design, handling modal internal state is fine.
}

const MotivationsSection: React.FC<MotivationsSectionProps> = ({loading, onShuffle, isOwner}) => {
    const [isInteracting, setIsInteracting] = useState(false);
    const [isCustomModalOpen, setIsCustomModalOpen] = useState(false);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    const handleInteraction = useCallback(() => {
        setIsInteracting(true);
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        timeoutRef.current = setTimeout(() => {
            setIsInteracting(false);
        }, 5000); // Increased to 5s
    }, []);

    if (loading) return null;

    return (
        <>
            <div 
                className="flex flex-col items-center justify-center py-6 px-4 w-full text-center group select-none cursor-default"
                onMouseEnter={handleInteraction}
                onClick={handleInteraction}
                onTouchStart={handleInteraction}
            >
                <div className="relative max-w-4xl">
                     {/* Decorative large quote mark */}
                    <span className={cn(
                        "absolute -top-6 -left-2 text-6xl md:-top-10 md:-left-12 md:text-9xl font-serif leading-none select-none pointer-events-none transition-all duration-700",
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

                    <div className="h-10 mt-6 overflow-hidden relative w-full flex justify-center items-center">
                        <AnimatePresence>
                            {isInteracting && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: 10 }}
                                    transition={{ duration: 0.4, ease: "easeOut" }}
                                    className="flex items-center gap-4"
                                >
                                    <Button 
                                        variant="outline" 
                                        size="sm" 
                                        className="h-9 px-5 text-sm font-medium rounded-full border-primary/20 bg-background/50 hover:bg-primary/10 hover:border-primary/50 hover:text-primary transition-all duration-300 backdrop-blur-sm shadow-sm gap-2"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            onShuffle?.();
                                            console.log("Shuffle clicked");
                                        }}
                                    >
                                        <Shuffle className="w-4 h-4" />
                                        Shuffle
                                    </Button>
                                    
                                    {isOwner && (
                                        <Button 
                                            variant="outline" 
                                            size="sm" 
                                            className="h-9 px-5 text-sm font-medium rounded-full border-primary/20 bg-background/50 hover:bg-primary/10 hover:border-primary/50 hover:text-primary transition-all duration-300 backdrop-blur-sm shadow-sm gap-2"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                setIsCustomModalOpen(true);
                                            }}
                                        >
                                            <Pencil className="w-4 h-4" />
                                            Custom
                                        </Button>
                                    )}
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </div>

            <CustomQuotesModal 
                isOpen={isCustomModalOpen}
                onClose={() => setIsCustomModalOpen(false)}
                onAddQuote={(text) => console.log("Add quote:", text)}
                onDeleteQuote={(id) => console.log("Delete quote:", id)}
                onEditQuote={(id, text) => console.log("Edit quote:", id, text)}
                initialQuotes={[
                    { id: '1', text: 'Work hard in silence, let your success be your noise.' },
                    { id: '2', text: 'Discipline is doing what needs to be done, even if you don\'t want to.' }
                ]}
            />
        </>
    );
};

export default MotivationsSection;