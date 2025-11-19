import { render, screen } from '@testing-library/react';
import DashboardPage from '../../app/(main)/dashboard/page';

describe('DashboardPage', () => {
  it('renders the dashboard layout with placeholder content', () => {
    render(<DashboardPage />);

    // Check for main sections
    expect(screen.getByTestId('bio-section')).toBeInTheDocument();
    expect(screen.getByTestId('todos-section')).toBeInTheDocument();
    expect(screen.getByTestId('today-section')).toBeInTheDocument();
    expect(screen.getByTestId('yesterday-section')).toBeInTheDocument();
    expect(screen.getByTestId('the-pile-section')).toBeInTheDocument();

    // Check for placeholder text
    expect(screen.getByText('Your Bio Here')).toBeInTheDocument();
    expect(screen.getByText('Your Todos Here')).toBeInTheDocument();
    expect(screen.getByText(`Today's Habits`)).toBeInTheDocument();
    expect(screen.getByText(`Yesterday's Habits`)).toBeInTheDocument();
    expect(screen.getByText('Habits in The Pile')).toBeInTheDocument();
  });
});