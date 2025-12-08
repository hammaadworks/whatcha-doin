// lib/hooks/useConfettiColors.ts
import { useTheme } from 'next-themes';
import { useEffect, useState, useCallback } from 'react';

// Helper to convert HSL(var(--primary-hsl)) to a simple HEX or RGB string
// For now, assuming the --primary and --primary-foreground are already usable hex/rgb
// based on app/globals.css definitions.
function getCssVarColor(varName: string): string {
  if (typeof window === 'undefined') return ''; // For SSR
  const color = getComputedStyle(document.documentElement).getPropertyValue(varName).trim();
  // If it's `hsl(var(--some-hsl))`, we would need to parse it.
  // But based on globals.css, it's a direct hex like #FF6B6B or #00F5A0
  return color;
}

export function useConfettiColors(): string[] {
  const { theme } = useTheme();
  const [colors, setColors] = useState<string[]>(['#FF6B6B', '#FFFFFF']); // Default for light theme (Zenith)

  const updateColors = useCallback(() => {
    const primary = getCssVarColor('--primary');
    const primaryForeground = getCssVarColor('--primary-foreground');
    if (primary && primaryForeground) {
      setColors([primary, primaryForeground]);
    } else {
      // Fallback if CSS variables are not immediately available or theme changes unexpectedly
      if (theme === 'dark') {
        setColors(['#00F5A0', '#000000']); // Monolith defaults
      } else {
        setColors(['#FF6B6B', '#FFFFFF']); // Zenith defaults
      }
    }
  }, [theme]);

  useEffect(() => {
    updateColors();
    // Listen for theme changes or CSS variable changes if needed more dynamically
    // A simple re-run on 'theme' prop change from next-themes is usually sufficient
  }, [theme, updateColors]);

  return colors;
}
