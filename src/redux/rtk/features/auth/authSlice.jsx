import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: "",
  admin: {},
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loggedIn: (state, action) => {
      state.token = action.payload.token;
      state.admin = action.payload.admin;
    },
    loggedOut: (state) => {
      state.token = undefined;
      state.admin = undefined;
    },
  },
});

export default authSlice.reducer;
export const { loggedIn, loggedOut } = authSlice.actions;
