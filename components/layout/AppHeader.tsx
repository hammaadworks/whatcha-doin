'use client';

import React, {useEffect, useState} from 'react';
import Link from 'next/link';
import {useAuth} from '@/hooks/useAuth';
import {Button} from '@/components/ui/button';
import {AnimatedThemeToggler} from '@/components/ui/animated-theme-toggler';
import UserMenuPopover from '@/components/auth/UserMenuPopover';
import {KeyRound} from "lucide-react";
import {cn} from "@/lib/utils";
import {usePathname} from 'next/navigation';
import {Settings} from "lucide-react";
import {SettingsDrawer} from '@/components/layout/SettingsDrawer';
import KeyboardShortcutsModal from '@/components/shared/KeyboardShortcutsModal';

const AppHeader = () => {
    const {user, loading} = useAuth();
    const pathname = usePathname();
    const [isDark, setIsDark] = useState(false);
    const [isKeyboardShortcutsModalOpen, setIsKeyboardShortcutsModalOpen] = useState(false);

    useEffect(() => {
        const updateTheme = () => {
            setIsDark(document.documentElement.classList.contains("dark"));
        };

        updateTheme();

        const observer = new MutationObserver(updateTheme);
        observer.observe(document.documentElement, {
            attributes: true, attributeFilter: ["class"],
        });

        return () => observer.disconnect();
    }, []);

    if (loading) {
        return null; // Or a loading spinner
    }

    const logoSrc = isDark ? '/favicons/dark/logo-bg.png' : '/favicons/light/logo-bg.png';

    return (<React.Fragment>
            <header
                className="sticky top-0 z-50 flex items-center justify-between p-4 bg-card border-b border-card-border text-card-foreground">
                <div className="flex items-center space-x-2">
                    <Link href="/" className="flex items-center space-x-2">
                        <img src={logoSrc} alt="Whatcha Doin' Logo" className="h-8 w-auto"/>
                        <span className="text-gray-400">|</span>
                        <span className="text-xl font-bold">whatcha-doin</span>
                    </Link>
                </div>

                <div className="flex items-center space-x-4">
                    <AnimatedThemeToggler/>
                    {user && (<SettingsDrawer>
                            <button
                                className={cn("relative inline-flex h-10 w-10 items-center justify-center rounded-full bg-background text-foreground ring-offset-background transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 flex-shrink-0")}
                            >
                                <Settings className="h-6 w-6" strokeWidth={2.5}/>
                                <span className="sr-only">Settings</span>
                            </button>
                        </SettingsDrawer>)}
                    {user ? (<UserMenuPopover user={user}
                                              onOpenKeyboardShortcuts={() => setIsKeyboardShortcutsModalOpen(true)}/>) : (
                        <Link href="/logins"
                              className={cn("relative inline-flex h-10 w-10 items-center justify-center rounded-full ring-offset-background transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 flex-shrink-0",
                                  pathname === '/logins' ? 'bg-primary text-primary-foreground' : 'bg-background text-foreground'
                              )}>
                            <KeyRound className="h-6 w-6" strokeWidth={2.5}/>
                            <span className="sr-only">Login</span>
                        </Link>)}
                </div>
            </header>
            <KeyboardShortcutsModal
                open={isKeyboardShortcutsModalOpen}
                onOpenChange={setIsKeyboardShortcutsModalOpen}
            />
        </React.Fragment>);
};

export default AppHeader;
