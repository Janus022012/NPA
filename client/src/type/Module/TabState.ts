export type TabObject = {
  tabId: string;
  tabName: string;
  componentName: string;
  props: Array<unknown>;
};

export type AddTabPayload = {
  tabName: string;
  componentName: string;
  // componentに適用するprops
  props: Array<unknown>;
};

export type RemoveTabPayload = {
  removeTabId: string;
};

export type RenameTabPayload = {
  renameTabName: string;
  targetName: string;
};

export type ChangeActiveTabPayload = {
  activeTabId: string;
};

export type TabState = {
  tabObject: Array<TabObject>;
  activeTabId: string;
};
