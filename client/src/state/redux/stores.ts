import { combineReducers } from 'redux';
import { configureStore } from '@reduxjs/toolkit';

import drawerReducer from './Module/drawerModule';

export const rootReducer = combineReducers({
  drawer: drawerReducer,
});

const store = configureStore({ reducer: rootReducer });

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
export default store;
