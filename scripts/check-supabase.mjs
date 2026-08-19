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

console.log('URL:', url);
console.log('Key prefix:', key ? key.slice(0, 20) + '...' : 'MISSING');

const supabase = createClient(url, key);

// 1. Try to read from projects table (public read policy)
const { data: readData, error: readError } = await supabase
  .from('projects')
  .select('*')
  .limit(1);

console.log('\n--- READ projects (anon) ---');
if (readError) {
  console.log('ERROR:', readError.message, '| code:', readError.code);
} else {
  console.log('OK — table exists, rows:', readData.length);
}

// 2. Try to list storage buckets (public read policy on objects)
const { data: buckets, error: bucketError } = await supabase.storage.listBuckets();
console.log('\n--- LIST BUCKETS (anon) ---');
if (bucketError) {
  console.log('ERROR:', bucketError.message, '| code:', bucketError.code);
} else {
  console.log('Buckets:', buckets.map((b) => b.name).join(', ') || '(none)');
}

// 3. Try to list files in project-images bucket
const { data: files, error: filesError } = await supabase.storage
  .from('project-images')
  .list();
console.log('\n--- LIST project-images (anon) ---');
if (filesError) {
  console.log('ERROR:', filesError.message, '| code:', filesError.code);
} else {
  console.log('Files:', files.length);
}