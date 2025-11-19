import { test, expect } from '@playwright/test';

test.describe('Dashboard Page', () => {
  test('should navigate to the dashboard and display main sections', async ({ page }) => {
    await page.goto('/dashboard');

    // Check if the main sections are visible
    await expect(page.getByTestId('bio-section')).toBeVisible();
    await expect(page.getByTestId('todos-section')).toBeVisible();
    await expect(page.getByTestId('today-section')).toBeVisible();
    await expect(page.getByTestId('yesterday-section')).toBeVisible();
    await expect(page.getByTestId('the-pile-section')).toBeVisible();

    // Check for placeholder text
    await expect(page.getByText('Your Bio Here')).toBeVisible();
    await expect(page.getByText('Your Todos Here')).toBeVisible();
    await expect(page.getByText("Today's Habits")).toBeVisible();
    await expect(page.getByText("Yesterday's Habits")).toBeVisible();
    await expect(page.getByText('Habits in The Pile')).toBeVisible();
  });

  test('should display correct desktop layout', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 720 }); // Desktop viewport
    await page.goto('/dashboard');
    await expect(page).toHaveScreenshot('dashboard-desktop.png');
  });

  test('should display correct mobile layout', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 }); // Mobile viewport (e.g., iPhone X)
    await page.goto('/dashboard');
    await expect(page).toHaveScreenshot('dashboard-mobile.png');
  });

  test('should display a HabitCard in The Pile section', async ({ page }) => {
    await page.goto('/dashboard');
    const thePileSection = page.getByTestId('the-pile-section');
    await expect(thePileSection.getByText('Drink Water')).toBeVisible();
    await expect(thePileSection.getByText('(8 glasses)')).toBeVisible();
    await expect(thePileSection.getByText('🔥 5')).toBeVisible();
    await expect(thePileSection.getByText('Last: 10')).toBeVisible();
    await expect(thePileSection.getByText('Public')).toBeVisible();
  });

  test('should display HabitCreator in The Pile section', async ({ page }) => {
    await page.goto('/dashboard');
    const thePileSection = page.getByTestId('the-pile-section');
    await expect(thePileSection.getByPlaceholder('Add a new habit...')).toBeVisible();
    await expect(thePileSection.getByRole('button', { name: 'Add Habit' })).toBeVisible();
  });
});