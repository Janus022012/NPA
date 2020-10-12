import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  TabState,
  AddTabPayload,
  RenameTabPayload,
  RemoveTabPayload,
  ChangeActiveTabPayload,
} from '../../../type/Module/TabState';
import { v4 as uuidv4 } from 'uuid';

const UUID_HOMETAB = uuidv4();
const initialState: TabState = {
  tabObject: [
    {
      tabId: UUID_HOMETAB,
      tabName: 'Home',
      componentName: 'HomePage',
      props: [],
    },
  ],
  activeTabId: UUID_HOMETAB,
};

const tabModule = createSlice({
  name: 'tabSlice',
  initialState,
  reducers: {
    addTab: (state: TabState, action: PayloadAction<AddTabPayload>) => {
      return Object.assign({}, state, {
        tabObject: [
          ...state.tabObject,
          {
            tabId: uuidv4(),
            tabName: action.payload.tabName,
            componentName: action.payload.componentName,
            props: action.payload.props,
          },
        ],
      });
    },
    removeTab: (state: TabState, action: PayloadAction<RemoveTabPayload>) => {
      if (state.tabObject.length === 1) {
        return Object.assign({}, initialState);
      } else {
        return Object.assign({}, state, {
          tabObject: [
            ...state.tabObject.filter(
              obj => obj.tabId !== action.payload.removeTabId,
            ),
          ],
        });
      }
    },
    renameTab: (state: TabState, action: PayloadAction<RenameTabPayload>) => {
      return Object.assign({}, state, {
        tabObject: [
          ...state.tabObject.filter(obj => {
            if (obj.tabName !== action.payload.targetName) {
              return {
                tabId: obj.tabId,
                tabName: action.payload.renameTabName,
                componentName: obj.componentName,
                props: obj.props,
              };
            }
          }),
        ],
      });
    },
    changeActiveTab: (
      state: TabState,
      action: PayloadAction<ChangeActiveTabPayload>,
    ) => {
      return Object.assign({}, state, {
        ...state.tabObject,
        activeTabId: action.payload.activeTabId,
      });
    },
  },
});

export default tabModule.reducer;

export const {
  addTab,
  removeTab,
  renameTab,
  changeActiveTab,
} = tabModule.actions;
