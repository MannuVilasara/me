import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { kv } from '@/lib/kv';
import { z } from 'zod';

const messageSchema = z.object({
  message: z.string().min(1).max(500),
});

type GuestbookEntry = {
  id: string;
  author: string;
  username?: string;
  avatar?: string;
  message: string;
  timestamp: string;
  verified?: boolean;
};

// Helper function to read guestbook
async function readGuestbook(): Promise<GuestbookEntry[]> {
  try {
    const entries = await kv.lrange('guestbook', 0, -1);
    return entries.map((entry) => JSON.parse(entry));
  } catch (error) {
    console.error('Error reading guestbook:', error);
    return [];
  }
}

// Helper function to write guestbook
async function writeGuestbook(entries: GuestbookEntry[]): Promise<void> {
  try {
    // Clear existing entries
    await kv.del('guestbook');
    // Add all entries
    if (entries.length > 0) {
      await kv.rpush('guestbook', ...entries.map((entry) => JSON.stringify(entry)));
    }
  } catch (error) {
    console.error('Error writing guestbook:', error);
    throw new Error('Failed to save message');
  }
}

// GET /api/guestbook - Get all messages
export async function GET() {
  try {
    const entries = await readGuestbook();
    // Return entries sorted by timestamp (newest first)
    const sortedEntries = entries.sort(
      (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    );

    return NextResponse.json(sortedEntries);
  } catch (error) {
    console.error('Error fetching guestbook:', error);
    return NextResponse.json({ error: 'Failed to fetch messages' }, { status: 500 });
  }
}

// POST /api/guestbook - Add new message (requires authentication)
export async function POST(request: NextRequest) {
  try {
    // Check authentication
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      return NextResponse.json({ error: 'Authentication required' }, { status: 401 });
    }

    const body = await request.json();

    // Validate input
    const validatedData = messageSchema.parse(body);

    // Read current entries
    const entries = await readGuestbook();

    // Check for duplicate messages from same user in last 5 minutes
    const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000);
    const recentEntry = entries.find(
      (entry) =>
        entry.username === session.user.username && new Date(entry.timestamp) > fiveMinutesAgo
    );

    if (recentEntry) {
      return NextResponse.json(
        { error: 'Please wait 5 minutes before posting another message' },
        { status: 429 }
      );
    }

    // Create new entry with authenticated user data
    const newEntry: GuestbookEntry = {
      id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
      author: session.user.name || 'Anonymous',
      username: session.user.username,
      avatar: session.user.avatar,
      message: validatedData.message,
      timestamp: new Date().toISOString(),
      verified: true, // All authenticated users are verified
    };

    // Add to entries
    entries.push(newEntry);

    // Save back to KV
    await writeGuestbook(entries);

    return NextResponse.json(newEntry, { status: 201 });
  } catch (error) {
    console.error('Error adding guestbook entry:', error);

    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: 'Invalid input', details: error.issues }, { status: 400 });
    }

    return NextResponse.json({ error: 'Failed to save message' }, { status: 500 });
  }
}

// DELETE /api/guestbook - Delete a message (requires authentication and ownership)
export async function DELETE(request: NextRequest) {
  try {
    // Check authentication
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      return NextResponse.json({ error: 'Authentication required' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const messageId = searchParams.get('id');

    if (!messageId) {
      return NextResponse.json({ error: 'Message ID is required' }, { status: 400 });
    }

    // Read current entries
    const entries = await readGuestbook();

    // Find the message to delete
    const messageIndex = entries.findIndex((entry) => entry.id === messageId);

    if (messageIndex === -1) {
      return NextResponse.json({ error: 'Message not found' }, { status: 404 });
    }

    const message = entries[messageIndex];

    // Check if the authenticated user owns this message OR is the admin (MannuVilasara)
    const isOwner = message.username === session.user.username;
    const isAdmin = session.user.username === 'MannuVilasara';

    if (!isOwner && !isAdmin) {
      return NextResponse.json({ error: 'You can only delete your own messages' }, { status: 403 });
    }

    // Remove the message
    entries.splice(messageIndex, 1);

    // Save back to KV
    await writeGuestbook(entries);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting guestbook entry:', error);
    return NextResponse.json({ error: 'Failed to delete message' }, { status: 500 });
  }
}
