'use client';

import React, { useEffect, useState } from 'react'; // Import useEffect and useState
import ReactMarkdown from 'react-markdown';
import {MovingBorder} from '@/components/ui/moving-border';
// Removed TimezoneSelector import as it's no longer directly used for display here

interface ProfileLayoutProps {
    username: string;
    bio: string | null;
    isOwner: boolean;
    timezone?: string | null;
    onTimezoneChange?: (newTimezone: string) => Promise<void>;
    children: React.ReactNode;
}

const ProfileLayout: React.FC<ProfileLayoutProps> = ({username, bio, isOwner, timezone, onTimezoneChange, children}) => { // Removed onTimezoneChange from props
    const bioContent = bio || (isOwner ? 'This is your private dashboard. Your bio will appear here, and you can edit it in settings.' : 'This user has not set a bio yet.');

    // State to hold the current local time string
    const [localTime, setLocalTime] = useState<string>('');

    useEffect(() => {
        // Update local time display every second
        const updateTime = () => {
          if (timezone) {
            try {
              const timeString = new Date().toLocaleTimeString('en-US', {
                timeZone: timezone,
                hour: '2-digit',
                minute: '2-digit',
                timeZoneName: 'short'
              });
              setLocalTime(timeString);
            } catch (e) {
              setLocalTime('Invalid Timezone');
            }
          } else {
              setLocalTime(''); // Clear if no timezone
          }
        };
        updateTime();
        const interval = setInterval(updateTime, 1000);
        return () => clearInterval(interval);
    }, [timezone]); // Re-run effect if timezone changes

    return (<div
            className="profile-container w-full mx-auto bg-card border border-primary shadow-lg rounded-3xl relative mt-8 mb-8 overflow-hidden">
            {/* Main card content with its own padding and z-index */}
            <div className="relative z-10 p-4 sm:p-6 md:p-8 lg:p-12">
                <h1 className="text-4xl font-extrabold text-center text-primary mb-2 mt-4">
                    {isOwner ? `Welcome, ${username}!` : username}
                </h1>
                
                <div className="flex justify-center mb-4">
                    {timezone && localTime ? ( // Always display only the time if timezone is available
                        <div className="text-sm text-muted-foreground flex items-center gap-2">
                            <span className="font-mono">
                                {localTime}
                            </span>
                        </div>
                    ) : null}
                </div>

                <div className="bio text-lg text-muted-foreground text-center mb-8 leading-relaxed">
                    <ReactMarkdown>{bioContent}</ReactMarkdown>
                </div>

                <div className="main-profile-grid">
                    <div className="main-content-column">
                        {children}
                    </div>
                </div>
            </div>
            {!isOwner && (<div className="absolute inset-0 rounded-[inherit] z-20">
                    <MovingBorder duration={24000} rx="24" ry="24">
                        <div
                            className="h-1 w-6 bg-[radial-gradient(var(--primary)_60%,transparent_100%)] opacity-100 shadow-[0_0_25px_var(--primary)]"/>
                    </MovingBorder>
                </div>)}
        </div>);
};

export default ProfileLayout;