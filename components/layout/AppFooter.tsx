'use client';

import React from 'react';

const AppFooter = () => {
  return (
    <footer className="text-center p-4 bg-card border-t border-card-border text-muted-foreground text-sm">
      &copy; {new Date().getFullYear()} whatcha-doin. All rights reserved.
      <span className="mx-2">|</span>
      <a href="#" id="install-pwa-button" className="text-primary hover:underline">Install PWA</a>
    </footer>
  );
};

export default AppFooter;
