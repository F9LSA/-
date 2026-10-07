import { readFileSync } from 'node:fs';
import { createClient } from '@supabase/supabase-js';

// Read .env manually (no dotenv dependency)
const envText = readFileSync(new URL('../.env', import.meta.url), 'utf8');
const getEnv = (key) => {
  const match = envText.match(new RegExp(`^${key}=(.*)$`, 'm'));
  return match ? match[1].trim() : undefined;
};

const url = getEnv('VITE_SUPABASE_URL');
const key = getEnv('VITE_SUPABASE_ANON_KEY');

// Admin credentials — must match supabase/setup_admin.sql
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'admin@aghsan.com';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'ChangeThisPassword123!';

console.log('URL:', url);
console.log('Key prefix:', key ? key.slice(0, 20) + '...' : 'MISSING');
console.log('Admin email:', ADMIN_EMAIL);

const supabase = createClient(url, key);

// 1. Sign in with password
console.log('\n--- 1. SIGN IN ---');
const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
  email: ADMIN_EMAIL,
  password: ADMIN_PASSWORD,
});

if (signInError) {
  console.log('SIGN IN ERROR:', signInError.message, '| code:', signInError.code);
  console.log('\nRESULT: FAIL — could not sign in. Check admin credentials in supabase/setup_admin.sql.');
  process.exit(1);
}
console.log('Sign in OK. User:', signInData.user?.email);

// 2. Verify session is persisted and retrievable
console.log('\n--- 2. GET SESSION ---');
const { data: sessionData, error: sessionError } = await supabase.auth.getSession();

if (sessionError) {
  console.log('GET SESSION ERROR:', sessionError.message);
  console.log('\nRESULT: FAIL — session could not be retrieved.');
  process.exit(1);
}

if (!sessionData?.session?.user) {
  console.log('GET SESSION: NO SESSION FOUND');
  console.log('\nRESULT: FAIL — no authenticated session. Uploads will be rejected by RLS.');
  process.exit(1);
}
console.log('Session OK. Authenticated user:', sessionData.session.user.email);
console.log('Access token present:', Boolean(sessionData.session.access_token));

// 3. Attempt a test upload to project-images (RLS-protected, TO authenticated)
console.log('\n--- 3. TEST UPLOAD (RLS check) ---');
const testFileName = `__auth_test_${Date.now()}.txt`;
const testContent = new Blob(['auth test'], { type: 'text/plain' });

const { error: uploadError } = await supabase.storage
  .from('project-images')
  .upload(testFileName, testContent);

if (uploadError) {
  console.log('UPLOAD ERROR:', uploadError.message, '| code:', uploadError.code);
  console.log('\nRESULT: FAIL — upload rejected. Session may not be attached to the request.');
  process.exit(1);
}
console.log('Upload OK — RLS policy passed with authenticated session.');

// 4. Clean up the test file
console.log('\n--- 4. CLEANUP ---');
const { error: removeError } = await supabase.storage
  .from('project-images')
  .remove([testFileName]);

if (removeError) {
  console.log('Cleanup warning:', removeError.message);
} else {
  console.log('Test file removed.');
}

console.log('\nRESULT: PASS — AdminLogin creates a valid session, getSession() returns an authenticated user, and Storage upload passes RLS.');