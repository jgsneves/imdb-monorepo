import { configureStore } from "@reduxjs/toolkit";
import authSliceReducer from "./slices/auth-slice";

export const store = configureStore({
  reducer: {
    auth: authSliceReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
