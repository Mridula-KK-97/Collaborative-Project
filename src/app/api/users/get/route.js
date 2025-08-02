import { supabase } from '@/lib/supabaseClient';

export async function GET() {
  const { data, error } = await supabase.from('users').select('*');

  if (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }

  return new Response(JSON.stringify({ users: data }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}
