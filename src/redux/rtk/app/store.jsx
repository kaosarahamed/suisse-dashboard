import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "../features/api/apiSlice";
import PostsReducer from "../../../store/reducers/PostsReducer";
import { AuthReducer } from "../../../store/reducers/AuthReducer";
import todoReducers from "../../../store/reducers/Reducers";
import jobFilterSlice from "../features/filters/jobFilterSlice";

const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    posts: PostsReducer,
    auth: AuthReducer,
    todoReducers,
    jobFilter: jobFilterSlice,
  },
  devTools: import.meta.env.NODE_ENV !== "production",
  middleware: (getDefaultMiddlware) =>
    getDefaultMiddlware().concat(apiSlice.middleware),
});

export default store;
