import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const webhookUrl = process.env.DISCORD_WEBHOOK_URL!;
  const { content } = await req.json();

  if (!content || typeof content !== 'string') {
    return NextResponse.json({ error: 'Invalid message' }, { status: 400 });
  }

  try {
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
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
