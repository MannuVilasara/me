import { NextRequest, NextResponse } from 'next/server';

interface WakatimeStats {
  total_seconds: number;
  total_projects: number;
  total_languages: number;
  total_editors: number;
  total_operating_systems: number;
  total_categories: number;
  human_readable_total: string;
  human_readable_daily_average: string;
  best_day: {
    date: string;
    total_seconds: number;
    human_readable_total: string;
  };
  daily_average_seconds: number;
}

export async function GET(request: NextRequest) {
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
  } catch (error) {
    return NextResponse.json({ error: 'An unexpected error occurred.' }, { status: 500 });
  }
}
