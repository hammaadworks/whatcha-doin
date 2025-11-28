'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { Check, ChevronsUpDown, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuth } from '@/hooks/useAuth';
import { updateUserTimezone } from '@/lib/supabase/user.client';

interface TimezoneSelectorProps {
  currentTimezone?: string;
  onTimezoneChange: (newTimezone: string) => void;
}

export const TimezoneSelector: React.FC<TimezoneSelectorProps> = ({ currentTimezone, onTimezoneChange }) => {
  const [open, setOpen] = useState(false);
  const [timezones, setTimezones] = useState<string[]>([]);
  const [localTime, setLocalTime] = useState<string>('');

  useEffect(() => {
    // Get all supported timezones
    try {
      const supportedTimezones = Intl.supportedValuesOf('timeZone');
      setTimezones(supportedTimezones);
    } catch (e) {
      console.error("Intl.supportedValuesOf not supported", e);
      setTimezones(['UTC', 'America/New_York', 'Europe/London', 'Asia/Tokyo']); // Fallback
    }
  }, []);

  useEffect(() => {
    // Update local time display every second
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
    onTimezoneChange(detected);
    setOpen(false);
  };

  return (
    <div className="flex items-center gap-2 text-sm text-muted-foreground">
      <Clock className="w-4 h-4" />
      <span className="font-mono">{localTime}</span>
      
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="ghost"
            role="combobox"
            aria-expanded={open}
            className="h-8 w-[200px] justify-between text-xs"
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
                <CommandItem onSelect={handleAutoDetect} className="cursor-pointer font-semibold text-primary">
                  <Check className={cn("mr-2 h-4 w-4", currentTimezone === Intl.DateTimeFormat().resolvedOptions().timeZone ? "opacity-100" : "opacity-0")} />
                  Auto-detect ({Intl.DateTimeFormat().resolvedOptions().timeZone})
                </CommandItem>
                {timezones.map((tz) => (
                  <CommandItem
                    key={tz}
                    value={tz}
                    onSelect={(currentValue) => {
                      onTimezoneChange(currentValue);
                      setOpen(false);
                    }}
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
