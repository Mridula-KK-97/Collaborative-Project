import { supabase } from '@/lib/supabaseClient'

export async function POST(request) {
  try {
    const body = await request.json()
    const { name, email, role, status ,date_of_joining } = body

    if (!name || !email || !role || typeof status !== 'boolean' || !date_of_joining) {
      return new Response(JSON.stringify({ error: 'Missing fields' }), {
        status: 400,
      });
    }

    const { data, error } = await supabase
      .from('users')
      .insert([{ name, email, role, status ,date_of_joining}])

    if (error) {
      console.error(error)
      return new Response(JSON.stringify({ error: error.message }), {
        status: 500,
      });
    }

    return new Response(JSON.stringify({ message: 'User added', data }), {
      status: 200,
    });
  } catch (err) {
    console.error(err)
    return new Response(JSON.stringify({ error: 'Server Error' }), {
      status: 500,
    });
  }
}
