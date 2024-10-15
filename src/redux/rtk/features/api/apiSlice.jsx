import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const basequary = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_APP_API_URL,
  prepareHeaders: async (headers) => {
    const adminAuth = localStorage.getItem("admin");
    const admin = JSON.parse(adminAuth);
    if (admin?.token) {
      const token = admin?.token;
      headers.set("token", `Bearer ${token}`);
    }
  },
});

export const apiSlice = createApi({
  reducerPath: "REST_API",
  baseQuery: async (args, api, extraOption) => {
    const result = await basequary(args, api, extraOption);
    return result;
  },
  endpoints: () => ({}),
});
