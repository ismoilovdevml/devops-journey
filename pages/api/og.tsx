import { ImageResponse } from '@vercel/og';
import { NextRequest } from 'next/server';

export const config = {
  runtime: 'edge',
};

// eslint-disable-next-line compat/compat
const font = fetch(
  'https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuI6fMZs.woff',
).then((res) => res.arrayBuffer());

export default async function handler(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const title = searchParams.get('title');
  const category = searchParams.get('category');
  const fontData = await font;

  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'center',
          backgroundImage: 'url(https://cs-uz.vercel.app/og-bg.jpg)',
          paddingLeft: 135,
          paddingRight: 450,
        }}
      >
        <div
          style={{
            display: 'flex',
            fontSize: 100,
            fontFamily: 'Inter',
            letterSpacing: '-0.05em',
            fontStyle: 'normal',
            color: 'white',
            lineHeight: '120px',
            whiteSpace: 'pre-wrap',
          }}
        >
          {title}
        </div>
        <div
          style={{
            display: 'flex',
            fontSize: 30,
            fontFamily: 'Inter',
            letterSpacing: '-0.05em',
            fontStyle: 'normal',
            color: '#757575',
            position: 'absolute',
            bottom: 100,
            marginLeft: 135,
            whiteSpace: 'pre-wrap',
            background: '#121212',
            padding: '10px 35px',
            textTransform: 'capitalize',
            borderRadius: '100px',
          }}
        >
          #{category}
        </div>
      </div>
    ),
    {
      width: 1920,
      height: 1080,
      fonts: [
        {
          name: 'Inter',
          data: fontData,
          style: 'normal',
        },
      ],
    },
  );
}
