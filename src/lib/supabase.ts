import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://vjaolwcexcjblstbsyoj.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZqYW9sd2NleGNqYmxzdGJzeW9qIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDMyODc3NzcsImV4cCI6MjAxODg2Mzc3N30.aMHiYWBEFmIJGZTjEjGwRZGZGEoXTBVRKPGbxzSZvlE';

export const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    persistSession: true,
    storageKey: 'tripwingz-auth',
    storage: window.localStorage,
    autoRefreshToken: true,
    detectSessionInUrl: true,
    flowType: 'pkce'
  }
});
