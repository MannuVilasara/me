// prettier-ignore
import { ImageResponse } from 'next/og';
import { projects } from '../../../data/projects';

export const runtime = 'edge';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');

  if (!id) {
    return new Response('Missing ?id=', { status: 400 });
  }

  const project = projects.find((p) => p.id === parseInt(id));
  if (!project) {
    return new Response('Project not found', { status: 404 });
  }

  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          padding: '48px',
          background: '#0a0a0a',
          color: '#fafafa',
          gap: '32px',
          fontFamily: 'Inter, system-ui, sans-serif',
        }}
      >
        {/* TITLE */}
        <div
          style={{
            display: 'flex',
            fontSize: 54,
            fontWeight: 700,
            color: '#fafafa',
            lineHeight: 1.2,
          }}
        >
          {project.title}
        </div>

        {/* METADATA */}
        <div
          style={{
            display: 'flex',
            fontSize: 22,
            fontWeight: 400,
            color: '#a1a1a1',
          }}
        >
          Created {project.createdAt}
        </div>

        {/* DESCRIPTION BOX */}
        <div
          style={{
            display: 'flex',
            padding: '32px',
            borderRadius: '24px',
            background: '#111113',
            border: '1px solid #27272a',
            fontSize: 22,
            lineHeight: 1.5,
            color: '#e5e5e5',
            maxWidth: '1000px',
          }}
        >
          {project.description}
        </div>

        {/* BADGES */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            gap: '12px',
            flexWrap: 'wrap',
          }}
        >
          {project.badge.map((badge) => (
            <div
              key={badge}
              style={{
                display: 'flex',
                padding: '8px 16px',
                borderRadius: '9999px',
                background: '#18181b',
                border: '1px solid #3f3f46',
                fontSize: 18,
                color: '#e4e4e7',
              }}
            >
              {badge}
            </div>
          ))}
        </div>

        {/* LINKS */}
        {(project.live || project.href) && (
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '8px',
              marginTop: '8px',
            }}
          >
            {project.live && (
              <div
                style={{
                  display: 'flex',
                  fontSize: 20,
                  color: '#e4e4e7',
                }}
              >
                🌐 Live: {project.live}
              </div>
            )}

            {project.href && (
              <div
                style={{
                  display: 'flex',
                  fontSize: 20,
                  color: '#a1a1a1',
                }}
              >
                📦 Repo: {project.href}
              </div>
            )}
          </div>
        )}
      </div>
    ),
    { width: 1200, height: 630 }
  );
}
