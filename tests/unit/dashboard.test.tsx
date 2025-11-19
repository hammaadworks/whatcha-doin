import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import DashboardPage from '@/app/(main)/dashboard/page';

describe('DashboardPage', () => {
  it('should render all dashboard sections with placeholder content', () => {
    render(<DashboardPage />);

    // Assert that the main sections are present
    expect(screen.getByTestId('bio-area')).toBeInTheDocument();
    expect(screen.getByTestId('todos-area')).toBeInTheDocument();
    expect(screen.getByTestId('today-habits-area')).toBeInTheDocument();
    expect(screen.getByTestId('yesterday-habits-area')).toBeInTheDocument();
    expect(screen.getByTestId('the-pile-area')).toBeInTheDocument();

    // Assert placeholder content
    expect(screen.getByText('Your Bio Here')).toBeInTheDocument();
    expect(screen.getByText('Your Todos Here')).toBeInTheDocument();
    expect(screen.getByText('Today\'s Habits')).toBeInTheDocument();
    expect(screen.getByText('Yesterday\'s Habits')).toBeInTheDocument();
    expect(screen.getByText('The Pile')).toBeInTheDocument();
  });
});
