import { configureStore } from '@reduxjs/toolkit';
import authReducer from '@/features/auth/authSlice';
import linksReducer from '@/features/links/linksSlice';
import analyticsReducer from '@/features/analytics/analyticsSlice';
import { baseApi } from '@/services/baseApi';

export const store = configureStore({
  reducer: {
    [baseApi.reducerPath]: baseApi.reducer, 
    auth: authReducer,
    links: linksReducer,
    analytics: analyticsReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(baseApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;