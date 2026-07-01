import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { INITIAL_DATA } from '@/lib/initial-data';

function getSupabase() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}

export async function GET() {
  const supabase = getSupabase();

  const { data, error } = await supabase
    .from('app_state')
    .select('*')
    .eq('id', 'main')
    .single();

  if (error || !data) {
    // First time: seed with initial data
    const initial = { id: 'main', content: INITIAL_DATA };
    await supabase.from('app_state').upsert(initial);
    return NextResponse.json({ areas: INITIAL_DATA });
  }

  return NextResponse.json({ areas: data.content });
}

export async function POST(request: Request) {
  const supabase = getSupabase();
  const body = await request.json();

  const { error } = await supabase
    .from('app_state')
    .upsert({ id: 'main', content: body.areas, updated_at: new Date().toISOString() });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
