import { notFound } from 'next/navigation';
import { getUserByUsername } from '@/lib/supabase/user';
import { PublicProfileView } from '@/components/profile/PublicProfileView';

type ProfilePageProps = {
  params: {
    username: string;
  };
};

export default async function ProfilePage({ params }: ProfilePageProps) {
  const { username } = await params;
  const user = await getUserByUsername(username);

  if (!user) {
    notFound();
  }

  // Assuming PublicProfileView can handle the full user object
  return (
    <div>
      <PublicProfileView user={user} />
    </div>
  );
}
