"use client";

import React, { useState, useRef, useEffect, useImperativeHandle } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Kbd } from "@/components/ui/kbd"; // Import Kbd component
import { Plus } from 'lucide-react'; // For a possible icon on the Add button

interface AddActionFormProps {
  onSave: (description: string) => void;
  onCancel: () => void;
  className?: string;
  placeholder?: string;
  autoFocusOnMount?: boolean;
}

export const AddActionForm = React.forwardRef<
  { focusInput: () => void; clearInput: () => void; isInputFocused: () => boolean; isInputEmpty: () => boolean },
  AddActionFormProps
>(({ onSave, onCancel, className, placeholder = "Add a new action...", autoFocusOnMount = true }, ref) => {
  const [description, setDescription] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useImperativeHandle(ref, () => ({
    focusInput: () => {
      inputRef.current?.focus();
    },
    clearInput: () => {
      setDescription('');
    },
    isInputFocused: () => {
      return inputRef.current === document.activeElement;
    },
    isInputEmpty: () => {
      return description === '';
    },
  }));

  useEffect(() => {
    if (autoFocusOnMount) {
      inputRef.current?.focus();
    }
  }, [autoFocusOnMount]);

  const handleSave = () => {
    if (description.trim()) {
      onSave(description.trim());
      setDescription('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault(); // Prevent form submission if it were in a form tag
      handleSave();
    } else if (e.key === 'Escape') {
      e.preventDefault(); // Prevent default browser escape behavior
      onCancel();
    }
  };

  const isInputFocused = inputRef.current === document.activeElement;

  return (
    <div className={cn(
      "flex items-center space-x-2 p-2 rounded-md bg-card border transition-all duration-200",
      isInputFocused ? "border-primary shadow-md" : "border-card-border",
      className
    )}>
      <Input
        ref={inputRef}
        type="text"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        className="flex-1 border-none focus-visible:ring-0 text-base" // Remove default input border and ring
      />
      
      {!isInputFocused && description === '' ? (
        <span className="text-muted-foreground text-sm flex items-center space-x-1">
          <span>Press</span>
          <Kbd>Ctrl</Kbd>
          <Kbd>I</Kbd>
          <span>to add</span>
        </span>
      ) : (
        <>
          <Button 
            onClick={handleSave} 
            size="sm" 
            disabled={!description.trim()}
            className="flex items-center space-x-1"
          >
            <Plus size={16} />
            <span>Add</span>
          </Button>
          <Button onClick={onCancel} variant="ghost" size="sm">Cancel</Button>
        </>
      )}
    </div>
  );
});

AddActionForm.displayName = 'AddActionForm';