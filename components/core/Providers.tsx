import { useTheme } from 'nextra-theme-docs';
import { ReactNode, useMemo } from 'react';

import { SyncedTabsContext, SyncedTabsState } from './SyncedTabs';
import { useLocalStorage } from '../../hooks';

type Props = {
  children?: ReactNode;
  dehydratedState?: string;
};

const themes: any = getThemes();

export function Providers({ children, dehydratedState }: Props) {
  const { theme } = useTheme();

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

  return (
    <SyncedTabsContext.Provider value={syncedTabsState}>
      {children}
    </SyncedTabsContext.Provider>
  );
}
