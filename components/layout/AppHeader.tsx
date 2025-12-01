'use client';

import React, {useEffect, useState} from 'react';
import Link from 'next/link';
import {useAuth} from '@/hooks/useAuth';
import {AnimatedThemeToggler} from '@/components/ui/animated-theme-toggler';
import UserMenuPopover from '@/components/auth/UserMenuPopover';
import {KeyRound, Settings} from "lucide-react";
import {cn} from "@/lib/utils";
import {usePathname} from 'next/navigation';
import {SettingsDrawer} from '@/components/layout/SettingsDrawer';
import KeyboardShortcutsModal from '@/components/shared/KeyboardShortcutsModal';
import { motion, useScroll, useMotionValueEvent } from "framer-motion";

const AppHeader = () => {
    const {user, loading} = useAuth();
    const pathname = usePathname();
    const [isDark, setIsDark] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [isKeyboardShortcutsModalOpen, setIsKeyboardShortcutsModalOpen] = useState(false);
    const { scrollY } = useScroll();

    useMotionValueEvent(scrollY, "change", (latest) => {
        setIsScrolled(latest > 20);
    });

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
        return null;
    }

    const logoSrc = isDark ? '/favicons/dark/logo-bg.png' : '/favicons/light/logo-bg.png';

    return (<React.Fragment>
            <motion.header
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className="fixed top-0 z-50 w-full flex justify-center pointer-events-none"
            >
                <div className={cn(
                    "pointer-events-auto flex items-center justify-between rounded-full transition-all duration-500 ease-in-out backdrop-blur-md w-[calc(100%-2rem)] max-w-5xl mt-4 border border-border/50",
                    isScrolled 
                        ? "px-4 py-2 bg-background/80 shadow-lg" 
                        : "px-6 py-3 bg-background/60 shadow-md"
                )}>
                    <div className="flex items-center space-x-2">
                        <Link href="/" className="flex items-center space-x-3 group">
                            <div className="relative overflow-hidden rounded-full p-1 transition-transform group-hover:scale-110">
                                <img src={logoSrc} alt="Whatcha Doin' Logo" className="h-8 w-auto"/>
                            </div>
                            <span className="text-muted-foreground/50">|</span>
                            <span className="text-lg font-bold tracking-tight text-foreground/90 transition-opacity duration-300">
                                whatcha-doin
                            </span>
                        </Link>
                    </div>

                    <div className="flex items-center space-x-2 md:space-x-4">
                        <AnimatedThemeToggler/>
                        
                        {user && (
                            <SettingsDrawer>
                                <button
                                    className={cn("relative inline-flex h-9 w-9 items-center justify-center rounded-full bg-secondary/50 text-secondary-foreground transition-all hover:bg-primary hover:text-primary-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring")}
                                >
                                    <Settings className="h-4 w-4" strokeWidth={2.5}/>
                                    <span className="sr-only">Settings</span>
                                </button>
                            </SettingsDrawer>
                        )}

                        {user ? (
                            <UserMenuPopover 
                                user={user}
                                onOpenKeyboardShortcuts={() => setIsKeyboardShortcutsModalOpen(true)}
                            />
                        ) : (
                            <Link href="/logins">
                                <button
                                    className={cn(
                                        "relative inline-flex h-9 items-center justify-center rounded-full px-4 text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
                                        pathname === '/logins' 
                                            ? "bg-primary text-primary-foreground shadow-md" 
                                            : "bg-secondary text-secondary-foreground hover:bg-primary hover:text-primary-foreground"
                                    )}
                                >
                                    <KeyRound className="mr-2 h-4 w-4" strokeWidth={2.5}/>
                                    <span>Login</span>
                                </button>
                            </Link>
                        )}
                    </div>
                </div>
            </motion.header>
            <KeyboardShortcutsModal
                open={isKeyboardShortcutsModalOpen}
                onOpenChange={setIsKeyboardShortcutsModalOpen}
            />
        </React.Fragment>);
};

export default AppHeader;
