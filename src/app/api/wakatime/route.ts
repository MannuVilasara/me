import { NextResponse } from 'next/server';

export async function GET() {
  const apiKey = process.env.WAKATIME_API_KEY;
  const BASE_URL = 'https://wakatime.com/api/v1';

  if (!apiKey) {
    return NextResponse.json(
      { error: 'WAKATIME_API_KEY is not set in environment variables.' },
      { status: 500 }
    );
  }

  try {
    const response = await fetch(`${BASE_URL}/users/current/stats/last_7_days?api_key=${apiKey}`, {
      method: 'GET',
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: 'Failed to fetch data from Wakatime API.' },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch {
    return NextResponse.json({ error: 'An unexpected error occurred.' }, { status: 500 });
  }
}
