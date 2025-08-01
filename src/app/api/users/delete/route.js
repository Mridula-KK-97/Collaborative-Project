import { supabase } from '@/lib/supabaseClient';

export async function DELETE(request) {
  try {
    const { id } = await request.json();

    if (!id) {
      return new Response(JSON.stringify({ error: 'User ID is required' }), {
        status: 400,
      });
    }

    const { error } = await supabase.from('users').delete().eq('id', id);

    if (error) {
      return new Response(JSON.stringify({ error: error.message }), {
        status: 500,
      });
    }

    return new Response(
      JSON.stringify({ message: 'User deleted successfully' }),
      { status: 200 }
    );
  } catch (err) {
    return new Response(
      JSON.stringify({ error: 'Failed to parse request body' }),
      { status: 400 }
    );
  }
}
