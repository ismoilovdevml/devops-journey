import { Tabs } from 'nextra/components';
import * as React from 'react';

export type SyncedTabsState = {
  store: {
    [key: string]: number;
  };
  setNewIndex: (key: string, index: number) => void;
};

export const SyncedTabsContext = React.createContext<SyncedTabsState>({
  store: {},
  setNewIndex: () => {
    //
  },
});

export const SyncedTab = (props: React.ComponentProps<typeof Tabs.Tab>) => {
  return <Tabs.Tab {...props} />;
};

export const SyncedTabs = (
  props: React.ComponentProps<typeof Tabs> & {
    group: string;
  },
) => {
  const { group, ...rest } = props;
  const { store, setNewIndex } = React.useContext(SyncedTabsContext);

  return (
    <Tabs
      {...rest}
      onChange={(index: number) => group && setNewIndex(group, index)}
      selectedIndex={store?.[group]}
    />
  );
};
