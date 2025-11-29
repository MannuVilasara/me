import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const response = await fetch('https://github-contributions.vercel.app/api/v1/MannuVilasara', {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; MyApp/1.0)',
        Accept: 'application/json',
      },
    });
    if (!response.ok) {
      return NextResponse.json(
        { error: 'Failed to fetch GitHub contributions' },
        { status: response.status }
      );
    }
    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: 'An unexpected error occurred.' }, { status: 500 });
  }
}
