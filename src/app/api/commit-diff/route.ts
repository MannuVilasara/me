import { NextRequest, NextResponse } from 'next/server';
import {
  GitHubCommit,
  GitHubFile,
  CommitDiffResponse,
} from '@/types/types';

// Simple in-memory cache
const cache = new Map<string, { data: CommitDiffResponse; timestamp: number }>();
const CACHE_DURATION = 1000 * 60 * 30; // 30 minutes

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const sha = searchParams.get('sha');

  if (!sha) {
    return NextResponse.json({ error: 'Commit SHA is required' }, { status: 400 });
  }

  // Check cache first
  const cached = cache.get(sha);
  if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
    return NextResponse.json(cached.data);
  }

  try {
    // Fetch commit diff from GitHub API
    const response = await fetch(`https://api.github.com/repos/MannuVilasara/me/commits/${sha}`, {
      headers: {
        Accept: 'application/vnd.github.v3+json',
        'User-Agent': 'Commit-Diff-API/1.0',
        ...(process.env.GITHUB_TOKEN && {
          Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
        }),
      },
    });

    if (!response.ok) {
      if (response.status === 403) {
        const resetTime = response.headers.get('X-RateLimit-Reset');
        const remaining = response.headers.get('X-RateLimit-Remaining');

        return NextResponse.json(
          {
            error: 'GitHub API rate limit exceeded',
            resetTime: resetTime ? new Date(parseInt(resetTime) * 1000).toISOString() : null,
            remaining: remaining || '0',
          },
          { status: 429 }
        );
      }
      throw new Error(`GitHub API error: ${response.status}`);
    }

    const commit: GitHubCommit = await response.json();

    // Get the diff
    const diffResponse = await fetch(
      `https://api.github.com/repos/MannuVilasara/me/commits/${sha}`,
      {
        headers: {
          Accept: 'application/vnd.github.v3.diff',
          'User-Agent': 'Commit-Diff-API/1.0',
          ...(process.env.GITHUB_TOKEN && {
            Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
          }),
        },
      }
    );

    if (!diffResponse.ok) {
      if (diffResponse.status === 403) {
        return NextResponse.json(
          {
            error: 'GitHub API rate limit exceeded for diff',
          },
          { status: 429 }
        );
      }
      throw new Error(`Failed to fetch diff: ${diffResponse.status}`);
    }

    const diff = await diffResponse.text();

    // Truncate diff if it's too long for display
    const truncatedDiff =
      diff.length > 10000
        ? diff.substring(0, 10000) + '\n\n... (diff truncated due to size)'
        : diff;

    const result = {
      sha: commit.sha,
      message: commit.commit.message,
      author: commit.commit.author.name,
      date: commit.commit.author.date,
      diff: truncatedDiff,
      files:
        commit.files?.map((file: GitHubFile) => ({
          filename: file.filename,
          status: file.status,
          additions: file.additions,
          deletions: file.deletions,
        })) || [],
    };

    // Cache the result
    cache.set(sha, { data: result, timestamp: Date.now() });

    return NextResponse.json(result);
  } catch (error) {
    console.error('Error fetching commit diff:', error);
    return NextResponse.json({ error: 'Failed to fetch commit diff' }, { status: 500 });
  }
}
