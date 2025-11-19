import { render, screen, fireEvent } from '@testing-library/react';
import { HabitCreator } from '../../components/habits/HabitCreator';

describe('HabitCreator', () => {
  const mockOnHabitCreated = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders the input field and "Add Habit" button', () => {
    render(<HabitCreator onHabitCreated={mockOnHabitCreated} />);
    expect(screen.getByPlaceholderText('Add a new habit...')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Add Habit' })).toBeInTheDocument();
  });

  it('updates the input field value on change', () => {
    render(<HabitCreator onHabitCreated={mockOnHabitCreated} />);
    const input = screen.getByPlaceholderText('Add a new habit...') as HTMLInputElement;
    fireEvent.change(input, { target: { value: 'New Habit' } });
    expect(input.value).toBe('New Habit');
  });

  it('shows the "+ Add Goal" button when habit name is entered and goal input is not shown', () => {
    render(<HabitCreator onHabitCreated={mockOnHabitCreated} />);
    const input = screen.getByPlaceholderText('Add a new habit...') as HTMLInputElement;
    fireEvent.change(input, { target: { value: 'New Habit' } });
    expect(screen.getByRole('button', { name: '+ Add Goal' })).toBeInTheDocument();
  });

  it('hides the "+ Add Goal" button and shows goal inputs when clicked', () => {
    render(<HabitCreator onHabitCreated={mockOnHabitCreated} />);
    const input = screen.getByPlaceholderText('Add a new habit...') as HTMLInputElement;
    fireEvent.change(input, { target: { value: 'New Habit' } });
    const addGoalButton = screen.getByRole('button', { name: '+ Add Goal' });
    fireEvent.click(addGoalButton);
    expect(addGoalButton).not.toBeInTheDocument();
    expect(screen.getByPlaceholderText('Goal value')).toBeInTheDocument();
    expect(screen.getByText('minutes')).toBeInTheDocument(); // Default selected unit
  });

  it('toggles the public switch', () => {
    render(<HabitCreator onHabitCreated={mockOnHabitCreated} />);
    const publicSwitch = screen.getByRole('switch', { name: 'Public' });
    expect(publicSwitch).toBeChecked();
    fireEvent.click(publicSwitch);
    expect(publicSwitch).not.toBeChecked();
    fireEvent.click(publicSwitch);
    expect(publicSwitch).toBeChecked();
  });

  // Note: Actual habit creation (calling createHabit) will be mocked out for unit tests
  // as it involves Supabase and is an integration concern.
});