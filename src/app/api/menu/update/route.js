import { supabase } from '@/lib/supabaseClient'

export async function PUT(request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return new Response(JSON.stringify({ error: 'Missing item ID' }), { status: 400 });
    }

    const body = await request.json();

    const { name, price, category, description, veg, available, image_url } = body;

    const { error } = await supabase
      .from('menu')
      .update({
        name,
        price,
        category,
        description,
        veg,
        available,
        image_url
      })
      .eq('id', id);

    if (error) {
      console.error('Update error:', error);
      return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }

    return new Response(JSON.stringify({ message: 'Item updated successfully' }), { status: 200 });
  } catch (err) {
    console.error('Server error:', err);
    return new Response(JSON.stringify({ error: 'Server error' }), { status: 500 });
  }
}
