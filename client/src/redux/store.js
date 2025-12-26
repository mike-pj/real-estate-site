import { configureStore } from '@reduxjs/toolkit';
import userReducer from './user/userSlice.js';

export const store = configureStore({
  reducer: {user: userReducer},

  //serialize in other to avoid errors with non-serializable values in the state
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})