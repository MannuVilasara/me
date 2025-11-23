import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export async function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          background: '#000',
          color: '#fff',
          padding: '48px',
          gap: '32px',
          fontFamily: 'monospace',
        }}
      >
        {/* NAME */}
        <div style={{ display: 'flex', fontSize: 56, fontWeight: 700 }}>Manpreet Singh</div>

        {/* USERNAME */}
        <div style={{ display: 'flex', fontSize: 28, color: '#ccc' }}>@MannuVilasara</div>

        {/* BIO */}
        <div
          style={{
            display: 'flex',
            fontSize: 22,
            color: '#aaa',
            lineHeight: 1.5,
            maxWidth: '80%',
          }}
        >
          Full-Stack Developer • Open Source Enthusiast • Crafting clean, minimal interfaces and
          building meaningful tools for the web.
        </div>

        {/* DIVIDER */}
        <div
          style={{
            display: 'flex',
            height: '1px',
            width: '100%',
            background: '#222',
            marginTop: '8px',
          }}
        />

        {/* DETAILS */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
            fontSize: 20,
            color: '#aaa',
          }}
        >
          <div style={{ display: 'flex' }}>🌐 mannu.live</div>
          <div style={{ display: 'flex' }}>📍 India</div>
        </div>

        {/* FOOTER */}
        <div
          style={{
            display: 'flex',
            fontSize: 18,
            color: '#666',
            marginTop: 'auto',
          }}
        >
          {' '}
          Generated with 💜 by Mannu
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  );
}
