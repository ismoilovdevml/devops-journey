import { useTheme } from 'next-themes';
import React from 'react';
import { RedocStandalone } from 'redoc';

export default function APIReferences() {
  const { theme } = useTheme();

  const isDark =
    theme === 'system'
      ? window.matchMedia('(prefers-color-scheme: dark)').matches ||
        (window.matchMedia('(prefers-color-scheme: no-preference)').matches &&
          window.matchMedia('(prefers-color-scheme: light)').matches)
      : theme === 'dark';

  return (
    <div className="w-screen">
      <RedocStandalone
        specUrl="https://raw.githubusercontent.com/livepeer/studio/master/packages/api/src/schema/api-schema.yaml"
        options={{
          nativeScrollbars: true,
          hideDownloadButton: true,
          hideLoading: true,
          hideSingleRequestSampleTab: true,
          theme: {
            colors: {
              primary: {
                main: '#00a55f',
              },
              text: {
                primary: isDark ? '#fff' : '#000',
                secondary: '#4d4d4d',
              },
              http: {
                get: 'rgba(0, 200, 219, 1)',
                post: 'rgba(28, 184, 65, 1)',
                put: 'rgba(255, 187, 0, 1)',
                delete: 'rgba(254, 39, 35, 1)',
              },
            },
            typography: {
              fontSize: '16px',
              fontFamily: 'Inter',
              optimizeSpeed: true,
              smoothing: 'antialiased',
              headings: {
                fontWeight: 'bold',
                lineHeight: '1em',
              },
            },
            sidebar: {
              width: '300px',
              backgroundColor: 'transparent',
              textColor: isDark ? '#9CA3AF' : '#000',
            },
            rightPanel: {
              backgroundColor: isDark ? '#121212' : '#2F343C',
              textColor: '#FFFFFF',
            },
          },
        }}
      />
    </div>
  );
}
