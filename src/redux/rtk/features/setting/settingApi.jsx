import { apiSlice } from "../api/apiSlice";

export const settingAuthApi = apiSlice.injectEndpoints({
  tagTypes: ["update"],
  endpoints: (builder) => ({
    getSetting: builder.query({
      query: () => ({
        url: "/auth/setting",
        method: "GET",
      }),
      providesTags: ["update"],
    }),
    createSetting: builder.mutation({
      query: (admin) => ({
        url: "/auth/setting",
        method: "POST",
        body: admin,
      }),
    }),
    updateSetting: builder.mutation({
      query: ({ formData, id }) => ({
        url: `/auth/setting/${id}`,
        method: "PATCH",
        body: formData,
      }),
      invalidatesTags: ["update"],
    }),
  }),
});

export const {
  useGetSettingQuery,
  useCreateSettingMutation,
  useUpdateSettingMutation,
} = settingAuthApi;
