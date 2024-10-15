import { createSlice } from "@reduxjs/toolkit";

// initial state
const initialState = {
  search: "",
};

const jobSlice = createSlice({
  name: "categoryFilter",
  initialState,
  reducers: {
    searchByNumber: (state, action) => {
      state.search = action.payload;
    },
  },
});

export const { searchByNumber } = jobSlice.actions;
export default jobSlice.reducer;
