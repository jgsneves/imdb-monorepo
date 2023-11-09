import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export enum UserRole {
  ADMIN = "ADMIN",
  USER = "USER",
}

export interface AuthSliceInitialState {
  accessToken: string | null;
  accessTokenExpires: string | null;
  userEmail: string | null;
  role: UserRole | null;
  id: string | null;
}

export interface LoginActionPayload {
  accessToken: string;
  expiringDate: string;
  email: string;
  role: UserRole;
  id: string;
}

export const initialState: AuthSliceInitialState = {
  accessToken: null,
  accessTokenExpires: null,
  userEmail: null,
  role: null,
  id: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<LoginActionPayload>) => {
      state.accessToken = action.payload.accessToken;
      state.accessTokenExpires = action.payload.expiringDate;
      state.userEmail = action.payload.email;
      state.role = action.payload.role;
      state.id = action.payload.id;
    },
    logOut: (state) => {
      state.accessToken = null;
      state.accessTokenExpires = null;
      state.userEmail = null;
      state.role = null;
      state.id = null;
    },
  },
});

export const { logOut, login } = authSlice.actions;

export default authSlice.reducer;
