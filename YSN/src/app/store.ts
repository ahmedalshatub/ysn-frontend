import { configureStore } from '@reduxjs/toolkit';
import type { Middleware } from '@reduxjs/toolkit';
import authReducer, { login, logout } from '../features/auth/slices/Auth.slice';
import themeReducer from '../core/slices/theme.slice';
import notificationReducer from '../features/notifications/slices/notification.slice';
import layoutReducer from '../core/slices/layout.slice';
import { instanceApi } from './api/instanceApi';

// A login or logout starts a NEW session: purge every cached query so nothing
// from the previous user (their profile, the rows they viewed) leaks into or
// refires under the new user's token.
const sessionBoundaryMiddleware: Middleware = (storeApi) => (next) => (action) => {
  const result = next(action);
  if (logout.match(action) || login.match(action)) {
    storeApi.dispatch(instanceApi.util.resetApiState());
  }
  return result;
};

export const store = configureStore({
  reducer: {
    auth: authReducer,
    theme: themeReducer,
    notification: notificationReducer,
    layout: layoutReducer,
    [instanceApi.reducerPath]: instanceApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(instanceApi.middleware, sessionBoundaryMiddleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
