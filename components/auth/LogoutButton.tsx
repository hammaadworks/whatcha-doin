"use client";

import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";


export default function LogoutButton() {
  const router = useRouter();
  const supabase = createClient();

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (!error) {
      router.push("/"); // Redirect to logins page after logout
    } else {
      console.error("Error logging out:", error.message);
      // Optionally, display an error message to the user
    }
  };

  return (
    <button
      onClick={handleLogout}
      className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-ring"
    >
      Logout
    </button>
  );
}
