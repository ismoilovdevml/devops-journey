import { Box, getThemes } from '@livepeer/design-system';
import {
  LivepeerConfig,
  ThemeConfig,
  createReactClient,
} from '@livepeer/react';
import { RainbowKitProvider, getDefaultWallets } from '@rainbow-me/rainbowkit';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AptosClient } from 'aptos';

import { useTheme } from 'nextra-theme-docs';
import { ReactNode, createContext, useMemo } from 'react';
import { WagmiConfig, configureChains, createClient } from 'wagmi';
import { polygonMumbai } from 'wagmi/chains';

import { infuraProvider } from 'wagmi/providers/infura';

import { publicProvider } from 'wagmi/providers/public';

import { SyncedTabsContext, SyncedTabsState } from './SyncedTabs';
import { useLocalStorage } from '../../hooks';

import { provider as livepeerProvider } from '../../lib/provider';

import '@rainbow-me/rainbowkit/styles.css';

export const AptosContext = createContext<AptosClient | null>(null);

const { chains, provider } = configureChains(
  [polygonMumbai],
  [
    infuraProvider({ apiKey: process.env.NEXT_PUBLIC_INFURA_API_KEY ?? '' }),
    publicProvider(),
  ],
);

const { connectors } = getDefaultWallets({
  appName: 'livepeer.js docs',
  chains,
});

const wagmiClient = createClient({
  connectors,
  provider,
});

const livepeerClient = createReactClient({
  provider: livepeerProvider,
});

type Props = {
  children?: ReactNode;
  dehydratedState?: string;
};

const livepeerLightTheme: ThemeConfig = {
  borderWidths: {
    loadingWidth: '2px',
  },
  colors: {
    accent: 'rgb(0, 145, 255)',
  },
  fonts: {
    display: 'Inter',
  },
  fontWeights: {
    titleFontWeight: '800',
  },
  sizes: {
    loading: '80px',
    trackActive: '6px',
    trackInactive: '3px',
  },
  radii: {
    slider: '4px',
  },
};

const livepeerDarkTheme: ThemeConfig = {
  borderStyles: {
    ...livepeerLightTheme.borderStyles,
  },
  borderWidths: {
    ...livepeerLightTheme.borderWidths,
  },
  colors: {
    ...livepeerLightTheme.colors,
    accent: '#00a55f',
  },
  fonts: {
    ...livepeerLightTheme.fonts,
  },
  fontWeights: {
    ...livepeerLightTheme.fontWeights,
  },
  sizes: {
    ...livepeerLightTheme.sizes,
  },
  radii: {
    ...livepeerLightTheme.radii,
  },
};

const themes: any = getThemes();

const queryClient = new QueryClient();

export function Providers({ children, dehydratedState }: Props) {
  const { theme } = useTheme();

  const livepeerTheme = useMemo(
    () => (theme === 'light' ? livepeerLightTheme : livepeerDarkTheme),
    [theme],
  );

  const [storedValue, setStoredValue] = useLocalStorage<
    SyncedTabsState['store']
  >(`tabs`, {});

  const syncedTabsState: SyncedTabsState = useMemo(
    () => ({
      store: storedValue,
      setNewIndex: (key, value) => {
        setStoredValue({
          ...storedValue,
          [key]: Number(value ?? 0),
        });
      },
    }),
    [storedValue, setStoredValue],
  );

  const aptosClient = useMemo(
    () => new AptosClient('https://fullnode.devnet.aptoslabs.com/v1'),
    [],
  );

  return (
    // Add styling for livepeer-design-system components
    <Box
      className={themes[`${theme === 'light' ? 'light' : 'dark'}-theme-blue`]}
    >
      <QueryClientProvider client={queryClient}>
        <WagmiConfig client={wagmiClient}>
          <RainbowKitProvider chains={chains}>
            <AptosContext.Provider value={aptosClient}>
              <LivepeerConfig
                dehydratedState={dehydratedState}
                client={livepeerClient}
                theme={livepeerTheme}
              >
                <SyncedTabsContext.Provider value={syncedTabsState}>
                  {children}
                </SyncedTabsContext.Provider>
              </LivepeerConfig>
            </AptosContext.Provider>
          </RainbowKitProvider>
        </WagmiConfig>
      </QueryClientProvider>
    </Box>
  );
}
