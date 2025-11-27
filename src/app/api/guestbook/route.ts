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
  pinned?: boolean;
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
    // Return entries sorted by pinned first, then by timestamp (newest first)
    const sortedEntries = entries.sort((a, b) => {
      if (a.pinned && !b.pinned) return -1;
      if (!a.pinned && b.pinned) return 1;
      return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
    });

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

// PATCH /api/guestbook - Pin/unpin a message (admin only)
export async function PATCH(request: NextRequest) {
  try {
    // Check authentication
    const session = await getServerSession(authOptions);

    if (!session?.user || session.user.username !== 'MannuVilasara') {
      return NextResponse.json({ error: 'Admin access required' }, { status: 403 });
    }

    const { searchParams } = new URL(request.url);
    const messageId = searchParams.get('id');
    const action = searchParams.get('action'); // 'pin' or 'unpin'

    if (!messageId || !['pin', 'unpin'].includes(action || '')) {
      return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
    }

    // Read current entries
    const entries = await readGuestbook();

    // Find the message
    const messageIndex = entries.findIndex((entry) => entry.id === messageId);

    if (messageIndex === -1) {
      return NextResponse.json({ error: 'Message not found' }, { status: 404 });
    }

    if (action === 'pin') {
      // Check if already 3 pinned
      const pinnedCount = entries.filter((entry) => entry.pinned).length;
      if (pinnedCount >= 3) {
        return NextResponse.json({ error: 'Maximum 3 pinned messages allowed' }, { status: 400 });
      }
      entries[messageIndex].pinned = true;
    } else {
      entries[messageIndex].pinned = false;
    }

    // Save back to KV
    await writeGuestbook(entries);

    // Return the updated entry
    const updatedEntry = entries[messageIndex];
    return NextResponse.json(updatedEntry);
  } catch (error) {
    console.error('Error updating guestbook entry:', error);
    return NextResponse.json({ error: 'Failed to update message' }, { status: 500 });
  }
}

// DELETE /api/guestbook - Delete a message (user or admin)
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
      return NextResponse.json({ error: 'Message ID required' }, { status: 400 });
    }

    // Read current entries
    const entries = await readGuestbook();

    // Find the message
    const messageIndex = entries.findIndex((entry) => entry.id === messageId);

    if (messageIndex === -1) {
      return NextResponse.json({ error: 'Message not found' }, { status: 404 });
    }

    const message = entries[messageIndex];

    // Check if user can delete this message (own message or admin)
    const isAdmin = session.user.username === 'MannuVilasara';
    const isOwner = message.username === session.user.username;

    if (!isOwner && !isAdmin) {
      return NextResponse.json({ error: 'Unauthorized to delete this message' }, { status: 403 });
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
