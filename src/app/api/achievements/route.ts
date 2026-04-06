import { NextResponse } from 'next/server';
import { db } from '@/db';
import { Achievements } from '@/db/schema';
import { desc } from 'drizzle-orm';

export async function GET() {
  const rows = await db
    .select()
    .from(Achievements)
    .orderBy(desc(Achievements.year), desc(Achievements.created_at));
  return NextResponse.json(rows);
}
