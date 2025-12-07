import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CollapsibleSectionWrapperProps {
  title: string;
  children: React.ReactNode;
  rightElement?: React.ReactNode;
  isCollapsible?: boolean;
  defaultOpen?: boolean;
}

export const CollapsibleSectionWrapper: React.FC<CollapsibleSectionWrapperProps> = ({
  title,
  children,
  rightElement,
  isCollapsible = false,
  defaultOpen = true,
}) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  const handleToggle = () => {
    if (isCollapsible) {
      setIsOpen(!isOpen);
    }
  };

  return (
    <div className="section mb-10">
      <div
        className={cn(
          "flex justify-between items-center border-b border-primary pb-4 mb-6 select-none",
          isCollapsible && "cursor-pointer group"
        )}
        onClick={handleToggle}
      >
        <h2 className="text-2xl font-extrabold text-primary group-hover:opacity-80 transition-opacity">{title}</h2>
        <div className="flex items-center gap-3">
          <div onClick={(e) => e.stopPropagation()}>
            {rightElement}
          </div>
          {isCollapsible && (
            <ChevronDown
              className={cn('transition-transform duration-300 h-6 w-6 text-primary', isOpen ? 'rotate-180' : '')}
            />
          )}
        </div>
      </div>
      {(!isCollapsible || isOpen) && (
        <div className={cn("animate-in slide-in-from-top-2 fade-in duration-300")}>
            {children}
        </div>
      )}
    </div>
  );
};
