import { supabase } from '@/lib/supabaseClient';

export async function PUT(req) {
  try {
    const body = await req.json();
    const { id, item_name, price, category, description, available } = body;

    const { error } = await supabase
      .from('menu_items') 
      .update({ item_name, price, category, description, available })
      .eq('id', id);

    if (error) {
      return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify({ error: 'Failed to update item' }), { status: 500 });
  }
}
