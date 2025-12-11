'use client';

import React, { useState, useRef, useEffect } from 'react';
import BaseModal from '@/components/shared/BaseModal';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus, Trash2, Pencil, Quote, Check, X } from 'lucide-react';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

// Define the structure of a quote object
export interface QuoteItem {
    id: string;
    text: string;
    author?: string; // Optional author
}

interface CustomQuotesModalProps {
    isOpen: boolean;
    onClose: () => void;
    // In a real app, these would be async functions interacting with the DB
    initialQuotes?: QuoteItem[]; 
    onAddQuote?: (text: string) => void;
    onDeleteQuote?: (id: string) => void;
    onEditQuote?: (id: string, newText: string) => void;
}

const CustomQuotesModal: React.FC<CustomQuotesModalProps> = ({
    isOpen,
    onClose,
    initialQuotes = [], // Default to empty if not provided
    onAddQuote,
    onDeleteQuote,
    onEditQuote
}) => {
    // Local state for the list (simulating DB for UI demo)
    // In production, this would be synced with props or a query hook
    const [quotes, setQuotes] = useState<QuoteItem[]>(initialQuotes);
    const [inputValue, setInputValue] = useState('');
    const [editingId, setEditingId] = useState<string | null>(null);
    const [editValue, setEditValue] = useState('');

    const inputRef = useRef<HTMLInputElement>(null);

    // Sync props to state if props change (e.g. data fetched)
    useEffect(() => {
        if (initialQuotes.length > 0) {
            setQuotes(initialQuotes);
        }
    }, [initialQuotes]);

    const handleAdd = () => {
        if (!inputValue.trim()) {
            toast.error("Quote cannot be empty");
            return;
        }

        const newQuote: QuoteItem = {
            id: Date.now().toString(), // Temp ID
            text: inputValue.trim(),
        };

        // Update local state
        setQuotes(prev => [newQuote, ...prev]); // Add to top
        
        // Call parent handler
        onAddQuote?.(inputValue.trim());

        // Reset
        setInputValue('');
        toast.success("Quote added to your vibe!");
        inputRef.current?.focus();
    };

    const handleDelete = (id: string) => {
        setQuotes(prev => prev.filter(q => q.id !== id));
        onDeleteQuote?.(id);
        toast.success("Quote removed.");
    };

    const startEditing = (quote: QuoteItem) => {
        setEditingId(quote.id);
        setEditValue(quote.text);
    };

    const saveEdit = () => {
        if (!editValue.trim() || !editingId) return;
        
        setQuotes(prev => prev.map(q => 
            q.id === editingId ? { ...q, text: editValue.trim() } : q
        ));
        onEditQuote?.(editingId, editValue.trim());
        setEditingId(null);
        toast.success("Quote updated.");
    };

    const cancelEdit = () => {
        setEditingId(null);
        setEditValue('');
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            handleAdd();
        }
    };

    return (
        <BaseModal
            isOpen={isOpen}
            onClose={onClose}
            title="Craft Your Vibe"
            description="Add personal mantras or favorite quotes to keep your fire burning."
            className="sm:max-w-xl" // Slightly wider
        >
            <div className="space-y-6 pb-6">
                
                {/* Input Section */}
                <div className="flex gap-2 items-center">
                    <div className="relative flex-grow">
                        <Quote className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/50" />
                        <Input
                            ref={inputRef}
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            onKeyDown={handleKeyDown}
                            placeholder="e.g., The only way out is through..."
                            className="pl-9 pr-4 bg-muted/30 border-primary/20 focus-visible:ring-primary/30"
                        />
                    </div>
                    <Button onClick={handleAdd} size="icon" className="shrink-0 rounded-full">
                        <Plus className="w-5 h-5" />
                    </Button>
                </div>

                {/* List Section */}
                <div className="space-y-3">
                    <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider pl-1">
                        Your Collection
                    </h3>
                    
                    <div className="space-y-2 max-h-[40vh] overflow-y-auto pr-1 -mr-2 no-scrollbar">
                        {quotes.length === 0 ? (
                            <div className="text-center py-10 border border-dashed rounded-xl border-muted-foreground/20 text-muted-foreground text-sm">
                                No custom quotes yet.<br/>Add your first one above! ✨
                            </div>
                        ) : (
                            quotes.map((quote) => (
                                <div 
                                    key={quote.id} 
                                    className={cn(
                                        "group flex items-start gap-3 p-3 rounded-xl border transition-all duration-200",
                                        editingId === quote.id 
                                            ? "bg-primary/5 border-primary/30 ring-1 ring-primary/20" 
                                            : "bg-card border-border/40 hover:border-primary/20 hover:shadow-sm"
                                    )}
                                >
                                    {/* Quote Icon / Bullet */}
                                    <div className="mt-1 text-primary/40 shrink-0">
                                        <Quote className="w-3 h-3 fill-current" />
                                    </div>

                                    {/* Content Area */}
                                    <div className="flex-grow min-w-0">
                                        {editingId === quote.id ? (
                                            <Input 
                                                value={editValue}
                                                onChange={(e) => setEditValue(e.target.value)}
                                                className="h-8 text-sm bg-transparent border-none shadow-none focus-visible:ring-0 p-0"
                                                autoFocus
                                                onKeyDown={(e) => {
                                                    if (e.key === 'Enter') saveEdit();
                                                    if (e.key === 'Escape') cancelEdit();
                                                }}
                                            />
                                        ) : (
                                            <p className="text-sm font-medium leading-relaxed break-words">
                                                {quote.text}
                                            </p>
                                        )}
                                    </div>

                                    {/* Actions */}
                                    <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
                                        {editingId === quote.id ? (
                                            <>
                                                <Button size="icon" variant="ghost" className="h-7 w-7 text-green-500 hover:text-green-600 hover:bg-green-500/10" onClick={saveEdit}>
                                                    <Check className="w-4 h-4" />
                                                </Button>
                                                <Button size="icon" variant="ghost" className="h-7 w-7 text-muted-foreground hover:text-foreground" onClick={cancelEdit}>
                                                    <X className="w-4 h-4" />
                                                </Button>
                                            </>
                                        ) : (
                                            <>
                                                <Button size="icon" variant="ghost" className="h-7 w-7 text-muted-foreground hover:text-primary hover:bg-primary/5" onClick={() => startEditing(quote)}>
                                                    <Pencil className="w-3.5 h-3.5" />
                                                </Button>
                                                <Button size="icon" variant="ghost" className="h-7 w-7 text-muted-foreground hover:text-destructive hover:bg-destructive/5" onClick={() => handleDelete(quote.id)}>
                                                    <Trash2 className="w-3.5 h-3.5" />
                                                </Button>
                                            </>
                                        )}
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </BaseModal>
    );
};

export default CustomQuotesModal;
