import { supabase } from '@/lib/supabaseClient';

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, price, category, description, available ,veg , image_url } = body;
    console.log('Incoming data:', { name, price, category, description, available , veg ,image_url  });

    if (!name || !description || !category || isNaN(price)) {
      console.error('Validation failed');
      return new Response(
        JSON.stringify({ error: 'Please provide valid name, category, numeric price, and description.' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const { data, error } = await supabase
      .from('menu_items')
      .insert([{
        name,
        price: parseFloat(price),
        category,
        description,
        available,
        veg,
        image_url ,
        created_at: new Date().toISOString(),
      }]);

    
    if (error) {
      console.error('Supabase insert error:', JSON.stringify(error, null, 2));
      return new Response(
        JSON.stringify({ error: error.message }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }

   
    return new Response(
      JSON.stringify({ data }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );

  } catch (err) {
    console.error('Unexpected server error:', err.message);
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
