import { createSlice } from '@reduxjs/toolkit';
import { DrawerState } from '../../../type/Module/DrawerState';

const initialState: DrawerState = {
  openDrawer: false,
};

const drawerModule = createSlice({
  name: 'drawerSlice',
  initialState,
  reducers: {
    openDrawer: (state: DrawerState) => {
      return Object.assign({}, state, {
        openDrawer: true,
      });
    },
    closeDrawer: (state: DrawerState) => {
      return Object.assign({}, state, {
        openDrawer: false,
      });
    },
  },
});

export default drawerModule.reducer;

export const { openDrawer, closeDrawer } = drawerModule.actions;
