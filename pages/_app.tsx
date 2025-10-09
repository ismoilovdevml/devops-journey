import { Analytics } from '@vercel/analytics/react';
import type { AppProps } from 'next/app';

import * as React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';

import 'react-medium-image-zoom/dist/styles.css';
import '../styles/globals.css';
import '../styles/custom-tabs.css';

function App({ Component, pageProps }: AppProps<{ dehydratedState: string }>) {
  const [queryClient] = React.useState(new QueryClient());
  return (
    <QueryClientProvider client={queryClient}>
      <Component {...pageProps} />
      <Analytics />
    </QueryClientProvider>
  );
}

export default App;
