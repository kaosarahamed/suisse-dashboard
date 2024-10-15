import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  clientToken: "",
  client: {},
};

export const clientSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clientLoggedIn: (state, action) => {
      state.clientToken = action.payload.clientToken;
      state.client = action.payload.client;
    },
    clientLoggedOut: (state) => {
      state.clientToken = undefined;
      state.client = undefined;
    },
  },
});

export default clientSlice.reducer;
export const { clientLoggedIn, clientLoggedOut } = clientSlice.actions;
