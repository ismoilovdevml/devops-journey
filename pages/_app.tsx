import type { AppProps } from 'next/app';

import * as React from 'react';

import '../styles/globals.css';

function App({ Component, pageProps }: AppProps<{ dehydratedState: string }>) {
  return <Component {...pageProps} />;
}

export default App;
