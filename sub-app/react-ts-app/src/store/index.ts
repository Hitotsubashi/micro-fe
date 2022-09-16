import { configureStore } from '@reduxjs/toolkit';
import type { AppState } from './module/app';
import { appReducer } from './module/app';

export interface RootState {
  app: AppState;
}

export default configureStore({
  reducer: {
    app: appReducer,
  },
});
