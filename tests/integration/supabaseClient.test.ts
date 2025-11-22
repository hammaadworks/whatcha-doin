// tests/integration/supabaseClient.test.ts
import { createClient } from '@/lib/supabase/client';
import { User } from '@supabase/supabase-js';

// Define the expected mock user from lib/supabase/client.ts
const EXPECTED_MOCK_USER: User = {
  id: "68be1abf-ecbe-47a7-bafb-46be273a2e",
  email: "hammaadworks@gmail.com",
  aud: "authenticated",
  app_metadata: {},
  user_metadata: {},
  created_at: expect.any(String), // Use expect.any(String) as actual date will vary
  updated_at: expect.any(String), // Use expect.any(String) as actual date will vary
};

describe('Supabase Client in Development Mode', () => {
  let originalDevMode: string | undefined;

  beforeAll(() => {
    // Store original env var state
    originalDevMode = process.env.NEXT_PUBLIC_DEV_MODE_ENABLED;
    // Set dev mode to true for these tests
    process.env.NEXT_PUBLIC_DEV_MODE_ENABLED = 'true';
  });

  afterAll(() => {
    // Restore original env var state
    if (originalDevMode !== undefined) {
      process.env.NEXT_PUBLIC_DEV_MODE_ENABLED = originalDevMode;
    } else {
        delete process.env.NEXT_PUBLIC_DEV_MODE_ENABLED;
    }
  });

  it('createClient().auth.getSession() should return a mock session with the expected user in dev mode', async () => {
    const supabase = createClient();
    const { data, error } = await supabase.auth.getSession();

    expect(error).toBeNull();
    expect(data.session).toBeDefined();
    expect(data.session?.user).toEqual(expect.objectContaining({
      id: EXPECTED_MOCK_USER.id,
      email: EXPECTED_MOCK_USER.email,
    }));
    expect(data.session?.access_token).toBe('mock-access-token');
    expect(data.session?.token_type).toBe('bearer');
  });

  it('createClient().auth.getUser() should return the mock user in dev mode', async () => {
    const supabase = createClient();
    const { data, error } = await supabase.auth.getUser();

    expect(error).toBeNull();
    expect(data.user).toBeDefined();
    expect(data.user).toEqual(expect.objectContaining({
      id: EXPECTED_MOCK_USER.id,
      email: EXPECTED_MOCK_USER.email,
    }));
  });

  it('createClient() should not return a mock session outside of dev mode', async () => {
      jest.resetModules();
    process.env.NEXT_PUBLIC_DEV_MODE_ENABLED = 'false'; // Temporarily set to false for this test
    const supabase = createClient();
    const { data, error } = await supabase.auth.getSession();
    
    // Expect session to be null or an error indicating no active session
    // This is a basic check; real behavior depends on actual Supabase setup
    expect(data.session).toBeNull();
    expect(error).toBeNull(); // No explicit error, just no session
  });
});
