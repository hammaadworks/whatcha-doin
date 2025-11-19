import React from "react";
import { redirect } from "next/navigation";
import AppHeader from "@/components/layout/AppHeader"; // Import AppHeader
import { createServer } from "@/lib/supabase/server";
import { AuthProvider } from "@/components/auth/AuthProvider"; // Import AuthProvider

export default async function AuthenticatedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  console.log('NEXT_PUBLIC_DEV_MODE_ENABLED in AuthenticatedLayout:', process.env.NEXT_PUBLIC_DEV_MODE_ENABLED);
  // Temporary: For development, bypass Supabase auth for server components too.
  // This ensures that the layout doesn't redirect if NEXT_PUBLIC_DEV_MODE_ENABLED=true.
  if (process.env.NEXT_PUBLIC_DEV_MODE_ENABLED === 'true') {
    const mockUser = {
      "id": "68be1abf-ecbe-47a7-bafb-406be273a02e",
      "email": "hammaadworks@gmail.com",
      "banned_until": null,
      "created_at": "2025-11-13 16:59:44.389126+00",
      "confirmed_at": "2025-11-13 17:00:05.782471+00",
      "confirmation_sent_at": "2025-11-13 16:59:44.45312+00",
      "is_anonymous": false,
      "is_sso_user": false,
      "invited_at": null,
      "last_sign_in_at": "2025-11-14 16:37:56.005573+00",
      "phone": null,
      "raw_app_meta_data": {
        "provider": "email",
        "providers": [
          "email"
        ]
      },
      "raw_user_meta_data": {
        "sub": "68be1abf-ecbe-47a7-bafb-406be273a02e",
        "email": "hammaadworks@gmail.com",
        "email_verified": true,
        "phone_verified": false
      },
      "updated_at": "2025-11-16 01:16:02.034342+00",
      "providers": [
        "email"
      ]
    };
    return (
      <AuthProvider initialUser={mockUser}>
        <AppHeader isAuthenticated={true} /> {/* Use AppHeader and pass isAuthenticated */}
        <main className="p-4">
          {children}
        </main>
      </AuthProvider>
    );
  }

  const supabase = createServer();

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    redirect("/login");
  }

  return (
    <AuthProvider initialUser={session?.user || null}>
      <AppHeader isAuthenticated={true} /> {/* Use AppHeader and pass isAuthenticated */}
      <main className="p-4">
        {children}
      </main>
    </AuthProvider>
  );
}