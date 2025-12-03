'use client';

import React, {createContext, useCallback, useContext, useEffect, useState} from 'react';
import { useRouter } from 'next/navigation'; // Import useRouter
import { useAuth } from '@/hooks/useAuth'; // Import useAuth
import KeyboardShortcutsModal from './KeyboardShortcutsModal';
// import InsightsTrigger from './InsightsTrigger'; // No longer needed here

interface KeyboardShortcutsContextType {
    isOpen: boolean;
    setIsOpen: (open: boolean) => void;
    toggleShortcutsModal: () => void;
    isInsightsOpen: boolean; // Exposed Insights state
    toggleInsightsModal: () => void; // Exposed Insights toggler
}

const KeyboardShortcutsContext = createContext<KeyboardShortcutsContextType | undefined>(undefined);

export const KeyboardShortcutsProvider: React.FC<{ children: React.ReactNode }> = ({children}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [isInsightsOpen, setInsightsOpen] = useState(false); // New state for Insights
    const [isMac, setIsMac] = useState(false);
    const router = useRouter(); // Initialize useRouter
    const { user } = useAuth(); // Get user from useAuth

    useEffect(() => {
        console.log('KeyboardShortcutsProvider useEffect running: Attaching keydown listener'); // Added log
        setIsMac(navigator.platform.toUpperCase().indexOf('MAC') >= 0);

            const handleKeyPress = (event: KeyboardEvent) => {
              // console.log('Keyboard Event:', event); // Added by me for debugging
              const isModifierPressed = event.altKey || event.metaKey; // Check for Alt/Option/Command
              const isSlashPressed = event.code === 'Slash'; // Use event.code for physical key detection
              const isPPressed = event.key === 'p' || event.key === 'P'; // Check for 'P' key
              const isIPressed = event.key === 'i' || event.key === 'I'; // Check for 'I' key

              if (isModifierPressed && isSlashPressed) {
                event.preventDefault();
                setIsOpen((prev) => !prev);
              } else if (isModifierPressed && isPPressed) {
                event.preventDefault();
                if (user?.username) {
                    router.push(`/${user.username}`);
                }
              } else if (isModifierPressed && isIPressed) { // Handle Alt + I
                event.preventDefault();
                if (user?.username) { // Only open if user is logged in
                    setInsightsOpen((prev) => !prev);
                }
              }
            };
        document.addEventListener('keydown', handleKeyPress);
        return () => {
            console.log('KeyboardShortcutsProvider useEffect cleanup: Removing keydown listener'); // Added log
            document.removeEventListener('keydown', handleKeyPress);
        };
    }, [user, router]); // Add user and router to dependency array

    const toggleShortcutsModal = useCallback(() => {
        setIsOpen((prev) => !prev);
    }, []);

    const toggleInsightsModal = useCallback(() => { // New toggler for Insights
        setInsightsOpen((prev) => !prev);
    }, []);

    return (<KeyboardShortcutsContext.Provider value={{
        isOpen,
        setIsOpen,
        toggleShortcutsModal,
        isInsightsOpen, // Provide Insights state
        toggleInsightsModal // Provide Insights toggler
    }}>
            {children}
            <KeyboardShortcutsModal open={isOpen} onOpenChange={setIsOpen}/>
            {/* Removed direct rendering of InsightsTrigger */}
        </KeyboardShortcutsContext.Provider>);
};

export const useKeyboardShortcuts = () => {
    const context = useContext(KeyboardShortcutsContext);
    if (context === undefined) {
        throw new Error('useKeyboardShortcuts must be used within a KeyboardShortcutsProvider');
    }
    return context;
};
