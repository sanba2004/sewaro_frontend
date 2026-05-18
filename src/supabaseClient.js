import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://gwphnkmdrswzcqpiugmr.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd3cGhua21kcnN3emNxcGl1Z21yIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzg0OTE2MDYsImV4cCI6MjA5NDA2NzYwNn0.Uy6Bt-ddl7KGwfo3TcJsXHIpg3jimrs4Swhb7yUaOeQ';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);