// components/shared/PWAInstallModal.tsx
import React from 'react';
import { Button } from '@/components/ui/button';

interface PWAInstallModalProps {
  show: boolean;
  message: string;
  onClose: () => void;
}

export const PWAInstallModal: React.FC<PWAInstallModalProps> = ({ show, message, onClose }) => {
  if (!show) return null;

  return (
    <div
      className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-[100] backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="bg-card text-card-foreground p-6 rounded-xl shadow-2xl max-w-sm w-full text-center border border-border"
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className="text-lg font-semibold mb-2">Install App</h3>
        <p className="mb-6 text-muted-foreground">{message}</p>
        <Button onClick={onClose} className="w-full">
          Got it
        </Button>
      </div>
    </div>
  );
};
