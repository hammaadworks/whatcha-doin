'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { Check, ChevronsUpDown, Clock, LocateFixed } from 'lucide-react'; // Added LocateFixed icon
import { cn } from '@/lib/utils';

interface TimezoneSelectorProps {
  currentTimezone?: string;
  onTimezoneChange: (newTimezone: string) => void;
}

export const TimezoneSelector: React.FC<TimezoneSelectorProps> = ({ currentTimezone, onTimezoneChange }) => {
  const [open, setOpen] = useState(false);
  const [timezones, setTimezones] = useState<string[]>([]);
  const [localTime, setLocalTime] = useState<string>('');

  useEffect(() => {
    try {
      const supportedTimezones = Intl.supportedValuesOf('timeZone');
      setTimezones(supportedTimezones);
    } catch (e) {
      console.error("Intl.supportedValuesOf not supported", e);
      setTimezones(['UTC', 'America/New_York', 'Europe/London', 'Asia/Tokyo']);
    }
  }, []);

  useEffect(() => {
    const updateTime = () => {
      if (currentTimezone) {
        try {
          const timeString = new Date().toLocaleTimeString('en-US', {
            timeZone: currentTimezone,
            hour: '2-digit',
            minute: '2-digit',
            timeZoneName: 'short'
          });
          setLocalTime(timeString);
        } catch (e) {
          setLocalTime('Invalid Timezone');
        }
      }
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, [currentTimezone]);

  const handleAutoDetect = () => {
    const detected = Intl.DateTimeFormat().resolvedOptions().timeZone;
    console.log("Auto-detecting timezone (via button):", detected);
    onTimezoneChange(detected);
    setOpen(false); // Close popover after selection
  };

  const handleTimezoneSelect = (tz: string) => {
    console.log("Selected timezone (from list):", tz);
    onTimezoneChange(tz);
    setOpen(false); // Close popover after selection
  }

  // Determine if the detected timezone is the current one
  const isAutoDetectedCurrent = currentTimezone === Intl.DateTimeFormat().resolvedOptions().timeZone;

  return (
    <div className="flex flex-col gap-2"> {/* Changed to flex-col to stack time and selector */}
      <div className="flex items-center gap-2 text-sm text-muted-foreground justify-between">
        <div className="flex items-center gap-2">
            <Clock className="w-4 h-4" />
            <span className="font-mono">{localTime}</span>
        </div>
        {/* New Auto-detect button next to the time display */}
        <Button variant="outline" size="sm" onClick={handleAutoDetect} className="h-7 text-xs">
            <LocateFixed className="mr-1 h-3 w-3" /> Auto-detect
        </Button>
      </div>
      
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline" // Changed variant for better visibility
            role="combobox"
            aria-expanded={open}
            className="w-[200px] justify-between text-xs h-9" // Adjusted height and width
          >
            {currentTimezone || "Select timezone..."}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[300px] p-0">
          <Command>
            <CommandInput placeholder="Search timezone..." />
            <CommandList>
              <CommandEmpty>No timezone found.</CommandEmpty>
              <CommandGroup>
                {/* Auto-detect CommandItem - keep for searchability, but primary interaction is the button */}
                <CommandItem
                  value="Auto-detect" // Value for search
                  onSelect={handleAutoDetect}
                  className={cn("cursor-pointer font-semibold text-primary", isAutoDetectedCurrent && "bg-accent")} // Highlight if currently selected
                >
                  <Check className={cn("mr-2 h-4 w-4", isAutoDetectedCurrent ? "opacity-100" : "opacity-0")} />
                  Auto-detect ({Intl.DateTimeFormat().resolvedOptions().timeZone})
                </CommandItem>
                {timezones.map((tz) => (
                  <CommandItem
                    key={tz}
                    value={tz}
                    onSelect={() => handleTimezoneSelect(tz)} // Use new handler
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        currentTimezone === tz ? "opacity-100" : "opacity-0"
                      )}
                    />
                    {tz}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
};
