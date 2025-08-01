import { supabase } from '@/lib/supabaseClient'

export async function DELETE(req) {
  const { searchParams } = new URL(req.url)
  const id = searchParams.get('id')

  if (!id) {
    return new Response(JSON.stringify({ error: 'Missing ID' }), { status: 400 })
  }

  const { data, error } = await supabase
    .from('menu_items') 
    .delete()
    .eq('id', id)

  if (error) {
    console.error('Supabase Delete Error:', error)
    return new Response(JSON.stringify({ error: 'Failed to delete item' }), { status: 500 })
  }

  return new Response(JSON.stringify({ message: 'Deleted successfully' }), {
    status: 200,
  })
}
