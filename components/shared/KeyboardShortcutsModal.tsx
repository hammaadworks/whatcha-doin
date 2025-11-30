'use client';

import React, { useState, useEffect, useCallback } from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Kbd } from '@/components/ui/kbd'; // Assuming kbd is available here

interface KeyboardShortcutsModalProps {
  children?: React.ReactNode;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const KeyboardShortcutsModal: React.FC<KeyboardShortcutsModalProps> = ({ children, open, onOpenChange }) => {
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.ctrlKey && event.key === '/') {
        event.preventDefault();
        onOpenChange(!open);
      }
    };

    document.addEventListener('keydown', handleKeyPress);
    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, [open, onOpenChange]);

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      {children && <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>}
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Keyboard Shortcuts</AlertDialogTitle>
          <AlertDialogDescription>
            Navigate and interact with the application using these shortcuts.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div className="grid grid-cols-2 gap-4 py-4">
          <div className="flex flex-col space-y-2">
            <h4 className="text-sm font-semibold">Global</h4>
            <div className="flex items-center justify-between">
              <span>Open Shortcuts</span>
              <div className="flex space-x-1">
                <Kbd>Ctrl</Kbd>
                <Kbd>/</Kbd>
              </div>
            </div>
            {/* Add more global shortcuts here */}
          </div>
          {/* Add more shortcut categories here */}
        </div>
        <AlertDialogFooter>
          <AlertDialogAction onClick={() => onOpenChange(false)}>Got it!</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default KeyboardShortcutsModal;
