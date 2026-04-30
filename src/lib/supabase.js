import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = (supabaseUrl && supabaseUrl !== 'your_supabase_url') 
  ? createClient(supabaseUrl, supabaseAnonKey)
  : { 
      from: () => ({ 
        select: () => Promise.resolve({ data: [], error: null }),
        insert: () => Promise.resolve({ error: null }) 
      }) 
    }

