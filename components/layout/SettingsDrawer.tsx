// components/layout/SettingsDrawer.tsx
"use client";

import { useState } from 'react';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { TimezoneSelector } from '@/components/profile/TimezoneSelector'; // Import TimezoneSelector
import { useAuth } from '@/hooks/useAuth'; // Import useAuth
import { updateUserTimezone } from '@/lib/supabase/user.client'; // Import updateUserTimezone
import { toast } from 'react-hot-toast'; // Assuming react-hot-toast is used

interface SettingsDrawerProps {
  children: React.ReactNode;
}

export function SettingsDrawer({ children }: SettingsDrawerProps) {
  const { user, refreshUser } = useAuth(); // Get user and refreshUser from useAuth
  const [isUpdatingTimezone, setIsUpdatingTimezone] = useState(false);

  const handleTimezoneChange = async (newTimezone: string) => {
    console.log("handleTimezoneChange triggered. New timezone:", newTimezone); // Added log
    if (!user?.id) {
      toast.error("User not authenticated.");
      console.error("User not authenticated. Cannot update timezone."); // Added log
      return;
    }
    if (newTimezone === user.timezone) {
      console.log("New timezone is the same as current. No update needed."); // Added log
      return;
    }

    setIsUpdatingTimezone(true);
    console.log(`Attempting to update user ${user.id} timezone to ${newTimezone}`); // Added log
    try {
      const result = await updateUserTimezone(user.id, newTimezone);
      console.log("updateUserTimezone result:", result); // Added log
      toast.success("Timezone updated successfully!");
      refreshUser(); // This should trigger a re-fetch of the user data including the new timezone
      console.log("refreshUser() called after successful update."); // Added log
    } catch (error) {
      console.error("Failed to update timezone:", error); // Original log improved
      toast.error("Failed to update timezone.");
    } finally {
      setIsUpdatingTimezone(false);
      console.log("Finished timezone update attempt."); // Added log
    }
  };

  return (
    <Sheet>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent side="right">
        <SheetHeader>
          <SheetTitle>Settings</SheetTitle>
          <SheetDescription>
            Manage your application settings and preferences.
          </SheetDescription>
        </SheetHeader>
        <div className="py-4 space-y-6">
          <section>
            <h3 className="text-lg font-medium mb-2">Timezone</h3>
            <TimezoneSelector
              currentTimezone={user?.timezone || 'UTC'} // Always pass a timezone, default to UTC
              onTimezoneChange={handleTimezoneChange}
              // Optionally disable selector while updating
              // disabled={isUpdatingTimezone}
            />
            {isUpdatingTimezone && (
                <p className="text-sm text-muted-foreground mt-2">Updating timezone...</p>
            )}
          </section>
        </div>
      </SheetContent>
    </Sheet>
  );
}