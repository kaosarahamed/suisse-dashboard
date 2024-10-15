import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  sellerToken: "",
  seller: {},
};

export const sellerSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    sellerLoggedIn: (state, action) => {
      state.sellerToken = action.payload.sellerToken;
      state.seller = action.payload.seller;
    },
    sellerLoggedOut: (state) => {
      state.sellerToken = undefined;
      state.seller = undefined;
    },
  },
});

export default sellerSlice.reducer;
export const { sellerLoggedIn, sellerLoggedOut } = sellerSlice.actions;
