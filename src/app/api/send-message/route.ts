import { NextResponse } from 'next/server';
import { z } from 'zod';

// Zod 4 schema validation
const messageSchema = z.object({
  content: z
    .string()
    .min(1, 'Message cannot be empty')
    .max(2000, 'Message too long (max 2000 characters)')
    .trim(),
});

export async function POST(req: Request) {
  const webhookUrl = process.env.DISCORD_WEBHOOK_URL!;

  try {
    const body = await req.json();

    // Validate with Zod 4
    const validation = messageSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        { error: validation.error.issues[0].message }, // ✅ Zod 4 uses 'issues'
        { status: 400 }
      );
    }

    const { content } = validation.data;

    const res = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ content }),
    });

    if (!res.ok) {
      throw new Error('Failed to send message to Discord');
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Internal server error' },
      { status: 500 }
    );
  }
}
