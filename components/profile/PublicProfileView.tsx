'use client';

type PublicProfileViewProps = {
  username: string;
};

export function PublicProfileView({ username }: PublicProfileViewProps) {
  return (
    <div>
      <h1>Public Profile of {username}</h1>
      {/* Placeholder for public profile content */}
    </div>
  );
}