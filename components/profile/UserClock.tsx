"use client";

import React, { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import { differenceInMinutes } from 'date-fns';
import { toZonedTime } from 'date-fns-tz';

interface UserClockProps {
  timezone: string;
  className?: string;
}

export const UserClock: React.FC<UserClockProps> = ({ timezone, className }) => {
  const [timeString, setTimeString] = useState<string>('');
  const [diffInfo, setDiffInfo] = useState<{ text: string; isSame: boolean }>({ text: '', isSame: true });

  useEffect(() => {
    const updateTime = () => {
      try {
        const now = new Date();
        
        // 1. Format the time string
        const formatted = new Intl.DateTimeFormat('en-US', {
          timeZone: timezone,
          weekday: 'short',
          hour: 'numeric',
          minute: '2-digit',
          hour12: true,
          timeZoneName: 'short',
        }).format(now);
        setTimeString(formatted);

        // 2. Calculate the difference relative to the viewer's local time
        const localTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

        // Helper to get "face value" timestamp
        const getFaceValueMs = (date: Date, tz: string) => {
             const str = date.toLocaleString('en-US', { timeZone: tz });
             return new Date(str).getTime();
        };

        const targetFaceMs = getFaceValueMs(now, timezone);
        const localFaceMs = getFaceValueMs(now, localTimezone);
        
        const diffMs = targetFaceMs - localFaceMs;
        const diffMinutes = Math.round(diffMs / (1000 * 60)); // Round to nearest minute
        
        if (Math.abs(diffMinutes) < 1) {
             setDiffInfo({ text: 'Same time as you', isSame: true });
        } else {
            const absMinutes = Math.abs(diffMinutes);
            const hours = Math.floor(absMinutes / 60);
            const minutes = absMinutes % 60;
            
            let durationStr = '';
            if (hours > 0) durationStr += `${hours}h`;
            if (minutes > 0) durationStr += ` ${minutes}m`;
            durationStr = durationStr.trim();
            
            if (!durationStr) durationStr = '0m'; // Should be caught by < 1 check, but safe fallback

            const direction = diffMinutes > 0 ? "ahead of you" : "behind you";
            setDiffInfo({ text: `${durationStr} ${direction}`, isSame: false });
        }

      } catch (e) {
        setTimeString('Invalid Timezone');
        setDiffInfo({ text: '', isSame: true });
      }
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, [timezone]);

  if (!timeString) return null;

  return (
    <div className={cn("flex flex-col items-end", className)}>
      {/* Main Pill */}
      <div
        className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border bg-background/80 backdrop-blur-sm text-xs font-medium text-muted-foreground shadow-sm hover:bg-accent/50 transition-colors cursor-default select-none"
        title={`Current time in ${timezone}`}
      >
        <span className="relative flex h-2 w-2">
          {/* Theme color dot with slow heartbeat animation */}
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75 duration-[3000ms]"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
        </span>
        <span className="font-mono tracking-tight">{timeString}</span>
      </div>
      
      {/* Subtitle for Time Difference */}
      {!diffInfo.isSame && (
        <span className="text-[10px] text-muted-foreground/80 font-medium mt-1 px-1 tracking-wide animate-in fade-in slide-in-from-top-1 duration-500">
          {diffInfo.text}
        </span>
      )}
    </div>
  );
};
