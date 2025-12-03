'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import KeyboardShortcutsModal from './KeyboardShortcutsModal';

interface KeyboardShortcutsContextType {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  toggleShortcutsModal: () => void;
}

const KeyboardShortcutsContext = createContext<KeyboardShortcutsContextType | undefined>(undefined);

export const KeyboardShortcutsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMac, setIsMac] = useState(false);

  useEffect(() => {
    setIsMac(navigator.platform.toUpperCase().indexOf('MAC') >= 0);

    const handleKeyPress = (event: KeyboardEvent) => {
      const isModifierPressed = event.altKey; // Check for Alt/Option
      const isSlashPressed = event.key && event.key === '/';

      if (isModifierPressed && isSlashPressed) {
        event.preventDefault();
        setIsOpen((prev) => !prev);
      }
    };

    document.addEventListener('keydown', handleKeyPress);
    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, [isMac]); // isMac is the only dependency that changes after initial render

  const toggleShortcutsModal = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  return (
    <KeyboardShortcutsContext.Provider value={{ isOpen, setIsOpen, toggleShortcutsModal }}>
      {children}
      <KeyboardShortcutsModal open={isOpen} onOpenChange={setIsOpen} />
    </KeyboardShortcutsContext.Provider>
  );
};

export const useKeyboardShortcuts = () => {
  const context = useContext(KeyboardShortcutsContext);
  if (context === undefined) {
    throw new Error('useKeyboardShortcuts must be used within a KeyboardShortcutsProvider');
  }
  return context;
};
