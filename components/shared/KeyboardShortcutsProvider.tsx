'use client';

import React, {createContext, useCallback, useContext, useEffect, useRef, useState} from 'react';
import { useRouter } from 'next/navigation'; // Import useRouter
import { useAuth } from '@/hooks/useAuth'; // Import useAuth
import KeyboardShortcutsModal from './KeyboardShortcutsModal';
import { useTheme } from 'next-themes'; // New import for theme management
import { AnimatedThemeTogglerRef } from '@/components/ui/animated-theme-toggler'; // New import for the ref type
import InsightsTrigger from '@/components/shared/InsightsTrigger'; // Import InsightsTrigger

interface KeyboardShortcutsContextType {
    isOpen: boolean;
    setIsOpen: (open: boolean) => void;
    toggleShortcutsModal: () => void;
    isInsightsOpen: boolean; // Exposed Insights state
    toggleInsightsModal: () => void; // Exposed Insights toggler
    isSettingsOpen: boolean; // Exposed Settings state
    toggleSettingsModal: () => void; // Exposed Settings toggler
    themeTogglerRef: React.RefObject<AnimatedThemeTogglerRef | null>; // Expose the ref for AnimatedThemeToggler, allowing null
    isMeFolded: boolean; // New state for 'Me' section folding
    toggleMeFold: () => void; // New toggler for 'Me' section folding
    isActionsFolded: boolean; // New state for 'Actions' section folding
    toggleActionsFold: () => void; // New toggler for 'Actions' section folding
    isJournalFolded: boolean; // New state for 'Journal' section folding
    toggleJournalFold: () => void; // New toggler for 'Journal' section folding
}

const KeyboardShortcutsContext = createContext<KeyboardShortcutsContextType | undefined>(undefined);

export const KeyboardShortcutsProvider: React.FC<{ children: React.ReactNode }> = ({children}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [isInsightsOpen, setInsightsOpen] = useState(false); // Re-added state for Insights
    const [isSettingsOpen, setSettingsOpen] = useState(false); // New state for Settings
    const [isMeFolded, setIsMeFolded] = useState(false); // New state for 'Me' section folding
    const [isActionsFolded, setIsActionsFolded] = useState(false); // New state for 'Actions' section folding
    const [isJournalFolded, setIsJournalFolded] = useState(false); // New state for 'Journal' section folding
    const [isMac, setIsMac] = useState(false);
    const router = useRouter(); // Initialize useRouter
    const { user } = useAuth(); // Get user from useAuth
    const { theme } = useTheme(); // Use the theme hook (setTheme is no longer needed directly here)
    const themeTogglerRef = useRef<AnimatedThemeTogglerRef>(null); // Create ref for AnimatedThemeToggler

    const toggleShortcutsModal = useCallback(() => {
        setIsOpen((prev) => !prev);
    }, []);

    const toggleInsightsModal = useCallback(() => { // Re-added toggler for Insights
        setInsightsOpen((prev) => !prev);
    }, []);

    const toggleSettingsModal = useCallback(() => { // New toggler for Settings
        setSettingsOpen((prev) => !prev);
    }, []);

    const toggleMeFold = useCallback(() => { // New toggler for 'Me' section folding
        setIsMeFolded((prev) => !prev);
    }, []);

    const toggleActionsFold = useCallback(() => { // New toggler for 'Actions' section folding
        setIsActionsFolded((prev) => !prev);
    }, []);

    const toggleJournalFold = useCallback(() => { // New toggler for 'Journal' section folding
        setIsJournalFolded((prev) => !prev);
    }, []);

    useEffect(() => {
        console.log('KeyboardShortcutsProvider useEffect running: Attaching keydown listener'); // Added log
        setIsMac(navigator.platform.toUpperCase().indexOf('MAC') >= 0);

            const handleKeyPress = (event: KeyboardEvent) => {
              const isModifierPressed = event.altKey || event.metaKey; // Check for Alt/Option/Command
              const isShiftPressed = event.shiftKey; // New check for Shift
              const isSlashPressed = event.code === 'Slash'; // Use event.code for physical key detection
              const isPPressed = event.key === 'p' || event.key === 'P'; // Check for 'P' key
              const isIPressed = event.key === 'i' || event.key === 'I'; // Re-added check for 'I' key
              const isSPressed = event.key === 's' || event.key === 'S'; // Check for 'S' key
              const isCPressed = event.key === 'c' || event.key === 'C'; // Check for 'C' key
              const isMPressed = event.key === 'm' || event.key === 'M'; // New check for 'M'
              const isAPressed = event.key === 'a' || event.key === 'A'; // New check for 'A'
              const isJPressed = event.key === 'j' || event.key === 'J'; // New check for 'J'

              if (isModifierPressed && isSlashPressed) {
                event.preventDefault();
                setIsOpen((prev) => !prev);
              } else if (isModifierPressed && isPPressed) {
                event.preventDefault();
                if (user?.username) {
                    router.push(`/${user.username}`);
                }
              } else if (isModifierPressed && isIPressed) { // Handle Alt + I - Re-added
                event.preventDefault();
                if (user?.username) { // Only open if user is logged in
                    setInsightsOpen((prev) => !prev);
                }
              } else if (isModifierPressed && isSPressed) { // Handle Alt + S for Settings
                event.preventDefault();
                setSettingsOpen((prev) => !prev);
              } else if (isModifierPressed && isCPressed) { // Handle Alt + C for Theme Toggle
                event.preventDefault();
                themeTogglerRef.current?.toggle();
              } else if (isModifierPressed && isShiftPressed && isMPressed) { // Alt + Shift + M
                event.preventDefault();
                toggleMeFold();
              } else if (isModifierPressed && isShiftPressed && isAPressed) { // Alt + Shift + A
                event.preventDefault();
                toggleActionsFold();
              } else if (isModifierPressed && isShiftPressed && isJPressed) { // Alt + Shift + J
                event.preventDefault();
                toggleJournalFold();
              }
            };
        document.addEventListener('keydown', handleKeyPress);
        return () => {
            console.log('KeyboardShortcutsProvider useEffect cleanup: Removing keydown listener'); // Added log
            document.removeEventListener('keydown', handleKeyPress);
        };
    }, [user, router, theme, toggleMeFold, toggleActionsFold, toggleJournalFold, setInsightsOpen]); // Re-add setInsightsOpen to dependency array


    return (<KeyboardShortcutsContext.Provider value={{
        isOpen,
        setIsOpen,
        toggleShortcutsModal,
        isInsightsOpen, // Provided Insights state
        toggleInsightsModal, // Provided Insights toggler
        isSettingsOpen, // Provide Settings state
        toggleSettingsModal, // Provide Settings toggler
        themeTogglerRef, // Provide the ref
        isMeFolded, // Provide 'Me' section folding state
        toggleMeFold, // Provide 'Me' section folding toggler
        isActionsFolded, // Provide 'Actions' section folding state
        toggleActionsFold, // Provide 'Actions' section folding toggler
        isJournalFolded, // Provide 'Journal' section folding state
        toggleJournalFold, // Provide 'Journal' section folding toggler
    }}>
            {children}
            <KeyboardShortcutsModal open={isOpen} onOpenChange={setIsOpen}/>
            {user?.username && ( // Conditionally render InsightsTrigger if user is logged in
                <InsightsTrigger username={user.username} open={isInsightsOpen} onOpenChange={toggleInsightsModal} />
            )}
        </KeyboardShortcutsContext.Provider>);
};

export const useKeyboardShortcuts = () => {
    const context = useContext(KeyboardShortcutsContext);
    if (context === undefined) {
        throw new Error('useKeyboardShortcuts must be used within a KeyboardShortcutsProvider');
    }
    return context;
};
