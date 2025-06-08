import { NextResponse } from 'next/server';
import axios from 'axios';

const GITHUB_API_URL = 'https://api.github.com/repos/MannuVilasara/me/commits/main';

export async function GET() {
  try {
    const res = await axios.get(GITHUB_API_URL, {
      headers: {
        Accept: 'application/vnd.github.v3+json',
        Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
      },
    });

    const data = res.data;

    return NextResponse.json({
      sha: data.sha,
      html_url: data.html_url,
      message: data.commit.message,
      author: data.commit.author.name,
      date: data.commit.author.date,
    });
  } catch (error) {
    console.error('Error fetching latest commit:', error);
    return NextResponse.json({ error: 'Failed to fetch latest commit' }, { status: 500 });
  }
}
