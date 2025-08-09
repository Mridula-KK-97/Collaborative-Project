import { supabase } from '@/lib/supabaseClient';

export async function GET() {
  const { data, error } = await supabase
    .from('orders') 
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Supabase fetch error:', error.message);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
  return NextResponse.json(data);
}
