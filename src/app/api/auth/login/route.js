import { supabase } from '@/lib/supabaseClient';

export async function POST(req) {
  try {
    const body = await req.json();
    const { username, password } = body;

    const { data, error } = await supabase
      .from('login')
      .select('email, role, name, password')
      .eq('email', username)
      .single();

    if (error) {
      console.error('Supabase error:', error);
      return Response.json({ error: 'Database error' }, { status: 500 });
    }

    if (!data) {
      console.warn('No user found with email:', username);
      return Response.json({ error: 'Invalid email or password' }, { status: 401 });
    }
    console.log('DB password:', data.password, 'Entered password:', password);
    if (data.password !== password) {
      return Response.json({ error: 'Invalid email or password' }, { status: 401 });
    }

    return Response.json({
      email: data.email,
      role: data.role,
      name: data.name,
    }, { status: 200 });

  } catch (err) {
    console.error("Login API error (uncaught):", err);
    return Response.json({ error: 'Unexpected server error' }, { status: 500 });
  }
}
