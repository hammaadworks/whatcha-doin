# Button Style Guide

This document outlines the color styles for key interactive elements in the application header, detailing their appearance in both normal and hover states for the Zenith (light) and Monolith (dark) themes.

## 1. Settings Button in App Header: "Solid Hover"

*   **Description:** This button has a solid background that changes on hover to the accent color, and the foreground (icon) color also changes to the accent foreground color.
*   **Location in Code:** `components/layout/AppHeader.tsx` (button containing the `Settings` icon)
*   **CSS Classes:** `relative inline-flex h-10 w-10 items-center justify-center rounded-full bg-background text-muted-foreground ring-offset-background transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring`

### Color Styles (Zenith - Light Theme)

*   **Normal State:**
    *   **Background:** `var(--background)` (resolves to `#FFFFFF`)
    *   **Text/Icon Color:** `var(--muted-foreground)` (resolves to `#495057`)
*   **Hover State:**
    *   **Background:** `var(--accent)` (resolves to `#FF6B6B`)
    *   **Text/Icon Color:** `var(--accent-foreground)` (resolves to `#FFFFFF`)

### Color Styles (Monolith - Dark Theme)

*   **Normal State:**
    *   **Background:** `var(--background)` (resolves to `#161616`)
    *   **Text/Icon Color:** `var(--muted-foreground)` (resolves to `#CCCCCC`)
*   **Hover State:**
    *   **Background:** `var(--accent)` (resolves to `#00F5A0`)
    *   **Text/Icon Color:** `var(--accent-foreground)` (resolves to `#000000`)

---

## 2. Settings Button in App Header: "Solid Ring"

*   **Description:** This button has a solid background, a theme-colored ring, and changes on hover to the accent color, with the foreground (icon) color also changing to the accent foreground color.
*   **Location in Code:** _(To be assigned to a component later)_
*   **CSS Classes:** `relative inline-flex h-10 w-10 items-center justify-center rounded-full bg-background text-muted-foreground ring-offset-background transition-colors ring-2 ring-primary hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring`

### Color Styles (Zenith - Light Theme)

*   **Normal State:**
    *   **Background:** `var(--background)` (resolves to `#FFFFFF`)
    *   **Text/Icon Color:** `var(--muted-foreground)` (resolves to `#495057`)
    *   **Ring Color:** `var(--primary)` (resolves to `#FF6B6B`)
*   **Hover State:**
    *   **Background:** `var(--accent)` (resolves to `#FF6B6B`)
    *   **Text/Icon Color:** `var(--accent-foreground)` (resolves to `#FFFFFF`)
    *   **Ring Color:** `var(--primary)` (resolves to `#FF6B6B`)

### Color Styles (Monolith - Dark Theme)

*   **Normal State:**
    *   **Background:** `var(--background)` (resolves to `#161616`)
    *   **Text/Icon Color:** `var(--muted-foreground)` (resolves to `#CCCCCC`)
    *   **Ring Color:** `var(--primary)` (resolves to `#00F5A0`)
*   **Hover State:**
    *   **Background:** `var(--accent)` (resolves to `#00F5A0`)
    *   **Text/Icon Color:** `var(--accent-foreground)` (resolves to `#000000`)
    *   **Ring Color:** `var(--primary)` (resolves to `#00F5A0`)

---

## 3. User Popover Menu Button in App Header: "Dim Hover"

*   **Description:** This button has a background of the primary theme color, and on hover, it becomes slightly dimmer while the foreground color remains the same.
*   **Location in Code:** `components/auth/UserMenuPopover.tsx` (button containing the `User` icon)
*   **CSS Classes:** `relative inline-flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground ring-offset-background transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 flex-shrink-0`

### Color Styles (Zenith - Light Theme)

*   **Normal State:**
    *   **Background:** `var(--primary)` (resolves to `#FF6B6B`)
    *   **Text/Icon Color:** `var(--primary-foreground)` (resolves to `#FFFFFF`)
*   **Hover State:**
    *   **Background:** `var(--primary)` at 90% opacity (effectively a slightly darker `#FF6B6B`)
    *   **Text/Icon Color:** `var(--primary-foreground)` (resolves to `#FFFFFF`)

### Color Styles (Monolith - Dark Theme)

*   **Normal State:**
    *   **Background:** `var(--primary)` (resolves to `#00F5A0`)
    *   **Text/Icon Color:** `var(--primary-foreground)` (resolves to `#000000`)
*   **Hover State:**
    *   **Background:** `var(--primary)` at 90% opacity (effectively a slightly darker `#00F5A0`)
    *   **Text/Icon Color:** `var(--primary-foreground)` (resolves to `#000000`)

---

## 4. User Clock Button: "Light Hover"

*   **Description:** This "pill" component displays the current time in the user's timezone. On hover, its background subtly changes to a semi-transparent accent color, while the text color remains constant.
*   **Location in Code:** `components/profile/UserClock.tsx` (the main `div` containing the clock display)
*   **CSS Classes:** `relative inline-flex items-center gap-2 px-3 py-1 rounded-full border border-transparent bg-background/80 backdrop-blur-sm text-xs font-medium text-muted-foreground shadow-sm hover:bg-accent/50 transition-colors cursor-pointer select-none`

### Color Styles (Zenith - Light Theme)

*   **Normal State:**
    *   **Background:** `var(--background)` at 80% opacity (resolves to `rgba(255, 255, 255, 0.8)`)
    *   **Text/Icon Color:** `var(--muted-foreground)` (resolves to `#495057`)
*   **Hover State:**
    *   **Background:** `var(--accent)` at 50% opacity (resolves to `rgba(255, 107, 107, 0.5)`)
    *   **Text/Icon Color:** `var(--muted-foreground)` (resolves to `#495057`)

### Color Styles (Monolith - Dark Theme)

*   **Normal State:**
    *   **Background:** `var(--background)` at 80% opacity (resolves to `rgba(22, 22, 22, 0.8)`)
    *   **Text/Icon Color:** `var(--muted-foreground)` (resolves to `#CCCCCC`)
*   **Hover State:**
    *   **Background:** `var(--accent)` at 50% opacity (resolves to `rgba(0, 245, 160, 0.5)`)
    *   **Text/Icon Color:** `var(--muted-foreground)` (resolves to `#CCCCCC`)
