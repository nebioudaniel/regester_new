// app/api/list-users/route.ts
import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase-admin';

export async function GET() {
  const { data, error } = await supabaseAdmin.auth.admin.listUsers();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  const users = data.users.map((user) => ({
    id: user.id,
    email: user.email,
    firstName: user.user_metadata.first_name || '',
    lastName: user.user_metadata.last_name || '',
    phone: user.user_metadata.phone || '',
  }));

  return NextResponse.json({ users });
}
