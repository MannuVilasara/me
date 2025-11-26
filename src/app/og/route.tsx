import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const title = searchParams.get('title') || 'Portfolio';
  const description =
    searchParams.get('description') || 'Full-Stack Developer & Open Source Enthusiast';

  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: '#050505', // Very dark background
          color: '#fff',
          padding: '60px',
          fontFamily: 'monospace', // Kept monospace for the tech feel
          justifyContent: 'space-between',
          // Soft, minimal monochrome gradient instead of dots
          backgroundImage: 'linear-gradient(to bottom right, #111111, #000000)',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', maxWidth: '60%' }}>
            {/* NAME & USERNAME */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <div style={{ fontSize: 56, fontWeight: 900, letterSpacing: '-0.03em' }}>
                Manpreet Singh
              </div>
              <div style={{ fontSize: 24, color: '#888', fontWeight: 500 }}>@MannuVilasara</div>
            </div>

            {/* BIO */}
            <div
              style={{
                fontSize: 24,
                color: '#ccc',
                lineHeight: 1.4,
                fontWeight: 400,
              }}
            >
              {description}
            </div>

            {/* DETAILS */}
            <div
              style={{
                display: 'flex',
                gap: '24px',
                fontSize: 18,
                color: '#666',
                marginTop: '12px',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center' }}>🌐 mannu.live</div>
              <div style={{ display: 'flex', alignItems: 'center' }}>📍 India</div>
            </div>
          </div>

          {/* AVATAR - Colorful */}
          <img
            src="https://avatars.githubusercontent.com/u/117009138?v=4"
            width={180}
            height={180}
            alt="Manpreet Singh Avatar"
            style={{
              borderRadius: '50%',
              border: '4px solid #222',
              boxShadow: '0 0 20px rgba(0,0,0,0.5)',
            }}
          />
        </div>

        {/* BOTTOM SECTION WITH DYNAMIC TITLE */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderTop: '2px solid #1a1a1a',
            paddingTop: '32px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div
              style={{
                width: '12px',
                height: '12px',
                borderRadius: '50%',
                backgroundColor: '#fff',
                boxShadow: '0 0 10px #fff',
              }}
            />
            <div
              style={{
                fontSize: 20,
                color: '#888',
                fontWeight: 600,
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
              }}
            >
              Current Page
            </div>
          </div>

          <div
            style={{
              fontSize: 40,
              fontWeight: 800,
              color: '#fff',
              backgroundColor: '#000',
              border: '2px solid #fff',
              padding: '12px 32px',
              borderRadius: '9999px', // Pill shape
            }}
          >
            {title}
          </div>
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  );
}
