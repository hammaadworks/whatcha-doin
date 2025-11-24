'use client';

import React from 'react';
import Link from 'next/link';
import { useAuth } from '@/hooks/useAuth';
import LogoutButton from '@/components/auth/LogoutButton';
import { ShimmerButton } from '@/components/ui/shimmer-button';
import { AnimatedThemeToggler } from '@/components/ui/animated-theme-toggler';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from '@/components/ui/button';
import { User as UserIcon } from 'lucide-react';

const AppHeader = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return null; // Or a loading spinner
  }

  return (
    <header className="flex items-center justify-between p-4 bg-card border-b border-card-border text-card-foreground">
      <Link href="/">
        <img src="/logo.svg" alt="Whatcha Doin' Logo" className="h-8 w-auto" />
        <span className="ml-2 text-xl font-bold">Whatcha Doin'</span>
      </Link>
      <div className="flex items-center space-x-4">
        <AnimatedThemeToggler />
        {user ? (
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="ghost" className="rounded-full h-10 w-10 p-0">
                <UserIcon />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-56">
              <div className="p-2">
                <Link href={`/${user.username}`}>
                  <div className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-800 rounded-md">
                    Your Profile
                  </div>
                </Link>
                <Link href="/settings">
                  <div className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-800 rounded-md">
                    Settings
                  </div>
                </Link>
                <div className="my-2 border-t border-gray-200 dark:border-gray-700" />
                <LogoutButton />
              </div>
            </PopoverContent>
          </Popover>
        ) : (
          <Link href="/login">
            <ShimmerButton className="shadow-2xl">
              <span className="whitespace-pre-wrap text-center text-sm font-medium leading-none tracking-tight text-white dark:from-white dark:to-slate-900/10 lg:text-lg">
                Login
              </span>
            </ShimmerButton>
          </Link>
        )}
      </div>
    </header>
  );
};

export default AppHeader;