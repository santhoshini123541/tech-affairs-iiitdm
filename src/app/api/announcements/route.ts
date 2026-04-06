import { NextResponse } from 'next/server';
import { db } from '@/db';
import { Announcements } from '@/db/schema';
import { eq, desc } from 'drizzle-orm';

export async function GET() {
  const rows = await db
    .select()
    .from(Announcements)
    .where(eq(Announcements.active, 'Y'))
    .orderBy(desc(Announcements.created_at));
  return NextResponse.json(rows);
}
