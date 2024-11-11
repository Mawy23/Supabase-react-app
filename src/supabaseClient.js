import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://oykfqhoodcezvcrngmwn.supabase.co';
const supabaseKey = process.env.REACT_APP_SUPABASE_KEY; // Utiliza variables de entorno para mayor seguridad
export const supabase = createClient(supabaseUrl, supabaseKey);
