'use client';

import { useAuth } from '@/hooks/useAuth';
import { PublicProfileView } from '@/components/profile/PublicProfileView';

type ProfilePageProps = {
  params: {
    username: string;
  };
};

export default function ProfilePage({ params }: ProfilePageProps) {
  const { user, loading } = useAuth();
  const { username } = params;

  if (loading) {
    return <div>Loading...</div>;
  }

  const isOwner = user?.username === username;

  return (
    <div>
      {isOwner ? (
        <div>
          <h1>Welcome to your profile, {username}!</h1>
          {/* Placeholder for the authenticated user's private dashboard */}
        </div>
      ) : (
        <PublicProfileView username={username} />
      )}
    </div>
  );
}
