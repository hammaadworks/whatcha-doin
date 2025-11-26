'use client';

import React from 'react';
import ReactMarkdown from 'react-markdown';
import InsightsTrigger from '../shared/InsightsTrigger'; // Assuming InsightsTrigger is in shared
import { MovingBorder } from "@/components/ui/moving-border";

interface ProfileLayoutProps {
  username: string;
  bio: string | null;
  isOwner: boolean;
  children: React.ReactNode;
}

const ProfileLayout: React.FC<ProfileLayoutProps> = ({ username, bio, isOwner, children }) => {
  const bioContent = bio || (isOwner ? 'This is your private dashboard. Your bio will appear here, and you can edit it in settings.' : 'This user has not set a bio yet.');

  return (
    <div className="profile-container w-full mx-auto bg-card border border-primary shadow-lg rounded-3xl relative mt-8 mb-8 overflow-hidden">
        {/* Main card content with its own padding and z-index */}
        <div className="relative z-10 p-4 sm:p-6 md:p-8 lg:p-12">
            <h1 className="text-4xl font-extrabold text-center text-primary mb-2 mt-4">
            {isOwner ? `Welcome, ${username}!` : username}
            </h1>
            <div className="bio text-lg text-muted-foreground text-center mb-8 leading-relaxed">
            <ReactMarkdown>{bioContent}</ReactMarkdown>
            </div>

            <div className="main-profile-grid">
            <div className="main-content-column">
                {children}
            </div>
            </div>
        </div>

        {/* Overlay for the MovingBorder effect */}
        <div className="absolute inset-0 rounded-[inherit]">
            <MovingBorder duration={50000} rx="24px" ry="24px">
                {/* The element that actually moves and creates the visual effect */}
                <div className="h-[4px] w-[50px] bg-[radial-gradient(var(--primary)_60%,transparent_100%)] opacity-100 box-shadow-[0_0_15px_var(--primary)]" />
            </MovingBorder>
        </div>
    </div>
  );
};

export default ProfileLayout;