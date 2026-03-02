import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://bjsspnrofxksgtchgjgc.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'sb_publishable_cr844krER9FKoWUCr2LYFQ_utT6hlhs';

export const hasSupabase = supabaseUrl !== '' && supabaseAnonKey !== '';

export const supabase = hasSupabase ? createClient(supabaseUrl, supabaseAnonKey) : null;
