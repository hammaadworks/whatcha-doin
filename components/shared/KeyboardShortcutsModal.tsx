'use client';

import React, { useState, useEffect, useCallback } from 'react';
import BaseModal from './BaseModal'; // Import the new BaseModal
import { Button } from '@/components/ui/button';
// import { Kbd } from '@/components/ui/kbd'; // Kbd is no longer directly used here
import KeyboardShortcut from './KeyboardShortcut'; // Import the new shared KeyboardShortcut component

interface KeyboardShortcutsModalProps {
  children?: React.ReactNode;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const KeyboardShortcutsModal: React.FC<KeyboardShortcutsModalProps> = ({ children, open, onOpenChange }) => {

  // Removed isMac state and useEffect as KeyboardShortcut component handles this internally
  // const [isMac, setIsMac] = useState(false);
  // useEffect(() => {
  //   setIsMac(navigator.platform.toUpperCase().indexOf('MAC') >= 0);
  // }, []);

  // const modifierKey = isMac ? "⌥" : "Alt"; // Removed as modifierKey is handled by KeyboardShortcut

  return (
    <BaseModal
      isOpen={open}
      onClose={() => onOpenChange(false)}
      title="Keyboard Shortcuts"
      description="Navigate and interact with the application using these shortcuts."
      footerContent={<Button type="button" onClick={() => onOpenChange(false)}>Got it!</Button>}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex flex-col space-y-2">
          <h4 className="text-sm font-semibold">Global</h4>
          <div className="flex items-center justify-between">
            <span>Open Shortcuts</span>
            <KeyboardShortcut keys={["/"]} />
          </div>
          <div className="flex items-center justify-between">
            <span>View Profile</span>
            <KeyboardShortcut keys={["P"]} />
          </div>
          <div className="flex items-center justify-between">
            <span>View Insights</span>
            <KeyboardShortcut keys={["I"]} />
          </div>
        </div>
        <div className="flex flex-col space-y-2">
          <h4 className="text-sm font-semibold">Action Items (when focused)</h4>
          <div className="flex items-center justify-between">
            <span>Move Item Up</span>
            <KeyboardShortcut keys={["↑"]} />
          </div>
          <div className="flex items-center justify-between">
            <span>Move Item Down</span>
            <KeyboardShortcut keys={["↓"]} />
          </div>
          <div className="flex items-center justify-between">
            <span>Indent Item</span>
            <KeyboardShortcut keys={["Tab"]} />
          </div>
          <div className="flex items-center justify-between">
            <span>Outdent Item</span>
            <KeyboardShortcut keys={["Shift", "Tab"]} />
          </div>
        </div>
      </div>
    </BaseModal>
  );
};

export default KeyboardShortcutsModal;
