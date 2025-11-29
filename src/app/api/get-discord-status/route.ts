import { NextResponse } from 'next/server';

export async function GET() {
  const DISCORD_USER_ID = '786926252811485186';

  try {
    const res = await fetch(`https://api.lanyard.rest/v1/users/${DISCORD_USER_ID}`);
    const data = await res.json();
    return NextResponse.json(data);
  } catch {
    return NextResponse.json({ error: 'Failed to fetch Discord data' }, { status: 500 });
  }
}
