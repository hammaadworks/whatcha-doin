'use client';

import React from 'react';
import Link from 'next/link';
import { useAuth } from '@/hooks/useAuth';
import { ShimmerButton } from '@/components/ui/shimmer-button';

const AppHeader = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return null; // Or a loading spinner
  }

  return (
    <header className="flex items-center justify-between p-4 bg-gray-800 text-white">
      <div className="flex items-center space-x-4">
        {!user && (
          <Link href="/login">
            <ShimmerButton className="shadow-2xl">
              <span className="whitespace-pre-wrap text-center text-sm font-medium leading-none tracking-tight text-white dark:from-white dark:to-slate-900/10 lg:text-lg">
                Login
              </span>
            </ShimmerButton>
          </Link>
        )}
      </div>
      <nav>
        {/* Navigation items can go here */}
      </nav>
    </header>
  );
};

export default AppHeader;