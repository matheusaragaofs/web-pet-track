import { configureStore } from '@reduxjs/toolkit';
import collarsReducer from '../pages/my-collars/redux'
export const store = configureStore({
  reducer: {
    collars: collarsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;