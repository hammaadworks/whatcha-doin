import React from 'react';
import { render, screen } from '@testing-library/react';
import ProfilePage from '@/app/[username]/page';
import { getUserByUsername } from '@/lib/supabase/user';
import { notFound } from 'next/navigation';
import { PublicProfileView } from '@/components/profile/PublicProfileView';

// Mock the getUserByUsername function
jest.mock('@/lib/supabase/user', () => ({
  getUserByUsername: jest.fn(),
}));

// Mock the notFound function from next/navigation
jest.mock('next/navigation', () => ({
  notFound: jest.fn() as jest.Mock<any, any, any>,
}));

// Mock the PublicProfileView component
jest.mock('@/components/profile/PublicProfileView', () => ({
  PublicProfileView: jest.fn(({ user }) => (
    <div>Public Profile View for {user.username}</div>
  )),
}));

describe('ProfilePage', () => {
  const mockGetUserByUsername = getUserByUsername as jest.Mock;
  const mockNotFound = notFound as unknown as jest.Mock;
  const mockPublicProfileView = PublicProfileView as jest.Mock;

  beforeEach(() => {
    mockGetUserByUsername.mockReset();
    mockNotFound.mockReset();
    mockPublicProfileView.mockReset();
  });

  it('should render PublicProfileView when a user is found', async () => {
    const mockUser = {
      id: 'user123',
      email: 'test@example.com',
      username: 'testuser',
      bio: 'Hello',
      habits: [],
      todos: [],
      journal_entries: [],
    };
    mockGetUserByUsername.mockResolvedValue(mockUser);

    render(await ProfilePage({ params: { username: 'testuser' } }));

    expect(mockGetUserByUsername).toHaveBeenCalledWith('testuser');
    expect(mockPublicProfileView).toHaveBeenCalledWith({ user: mockUser }, {});
    expect(screen.getByText(`Public Profile View for ${mockUser.username}`)).toBeInTheDocument();
    expect(mockNotFound).not.toHaveBeenCalled();
  });

  it('should call notFound when no user is found', async () => {
    mockGetUserByUsername.mockResolvedValue(null);

    render(await ProfilePage({ params: { username: 'nonexistent' } }));

    expect(mockGetUserByUsername).toHaveBeenCalledWith('nonexistent');
    expect(mockNotFound).toHaveBeenCalledTimes(1);
    expect(mockPublicProfileView).not.toHaveBeenCalled();
    expect(screen.queryByText(/Public Profile View/i)).not.toBeInTheDocument();
  });

  it('should call notFound when getUserByUsername returns an error (simulated by null)', async () => {
    mockGetUserByUsername.mockResolvedValue(null); // Simulate error leading to null

    render(await ProfilePage({ params: { username: 'erroruser' } }));

    expect(mockGetUserByUsername).toHaveBeenCalledWith('erroruser');
    expect(mockNotFound).toHaveBeenCalledTimes(1);
    expect(mockPublicProfileView).not.toHaveBeenCalled();
  });
});
