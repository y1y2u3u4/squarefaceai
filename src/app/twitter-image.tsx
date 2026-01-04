import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export const alt = 'SquareFaceAI - AI Pixel Avatar Generator';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #f0fdf4 0%, #ffffff 50%, #fdf4ff 100%)',
          fontFamily: 'system-ui, sans-serif',
        }}
      >
        {/* Decorative pixels */}
        <div
          style={{
            position: 'absolute',
            top: 40,
            left: 60,
            width: 20,
            height: 20,
            background: '#86efac',
            borderRadius: 4,
          }}
        />
        <div
          style={{
            position: 'absolute',
            top: 80,
            right: 100,
            width: 16,
            height: 16,
            background: '#f9a8d4',
            borderRadius: 4,
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: 100,
            left: 120,
            width: 24,
            height: 24,
            background: '#a78bfa',
            borderRadius: 4,
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: 80,
            right: 80,
            width: 18,
            height: 18,
            background: '#fde047',
            borderRadius: 4,
          }}
        />

        {/* Main content */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 24,
          }}
        >
          {/* Pixel avatar representations */}
          <div
            style={{
              display: 'flex',
              gap: 16,
              marginBottom: 20,
            }}
          >
            <div
              style={{
                width: 80,
                height: 80,
                background: 'linear-gradient(135deg, #10b981, #06b6d4)',
                borderRadius: 12,
                border: '4px solid #1f2937',
                boxShadow: '8px 8px 0 #1f2937',
              }}
            />
            <div
              style={{
                width: 100,
                height: 100,
                background: 'linear-gradient(135deg, #8b5cf6, #ec4899)',
                borderRadius: 16,
                border: '5px solid #1f2937',
                boxShadow: '10px 10px 0 #1f2937',
              }}
            />
            <div
              style={{
                width: 80,
                height: 80,
                background: 'linear-gradient(135deg, #f59e0b, #ef4444)',
                borderRadius: 12,
                border: '4px solid #1f2937',
                boxShadow: '8px 8px 0 #1f2937',
              }}
            />
          </div>

          {/* Title */}
          <div
            style={{
              display: 'flex',
              fontSize: 72,
              fontWeight: 800,
              background: 'linear-gradient(90deg, #10b981, #8b5cf6, #ec4899)',
              backgroundClip: 'text',
              color: 'transparent',
              letterSpacing: -2,
            }}
          >
            SquareFaceAI
          </div>

          {/* Subtitle */}
          <div
            style={{
              fontSize: 32,
              color: '#4b5563',
              fontWeight: 500,
            }}
          >
            Free AI Pixel Avatar Generator
          </div>

          {/* Features */}
          <div
            style={{
              display: 'flex',
              gap: 32,
              marginTop: 20,
              fontSize: 20,
              color: '#6b7280',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <div style={{ width: 10, height: 10, background: '#22c55e', borderRadius: 10 }} />
              Free to use
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <div style={{ width: 10, height: 10, background: '#3b82f6', borderRadius: 10 }} />
              No signup
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <div style={{ width: 10, height: 10, background: '#a855f7', borderRadius: 10 }} />
              10s generation
            </div>
          </div>
        </div>

        {/* URL */}
        <div
          style={{
            position: 'absolute',
            bottom: 40,
            fontSize: 24,
            color: '#9ca3af',
          }}
        >
          squarefaceai.com
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
