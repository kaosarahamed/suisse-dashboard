import { apiSlice } from "../api/apiSlice";

export const newsApi = apiSlice.injectEndpoints({
  tagTypes: ["update"],
  endpoints: (builder) => ({
    getOneNews: builder.query({
      query: (id) => ({
        url: `/auth/news/${id}`,
        method: "GET",
      }),
      providesTags: ["update"],
    }),
    getAllNews: builder.query({
      query: ({ page, limit }) => ({
        url: `/auth/news?page=${page}&limit=${limit}`,
        method: "GET",
      }),
      providesTags: ["update"],
    }),
    getAllNewsByAdmin: builder.query({
      query: ({ status, page, limit }) => ({
        url: `/auth/news/admin?status=${status}&page=${page}&limit=${limit}`,
        method: "GET",
      }),
      providesTags: ["update"],
    }),

    createNews: builder.mutation({
      query: (formData) => ({
        url: "/auth/news",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["update"],
    }),
    updateNews: builder.mutation({
      query: ({ formData, id }) => ({
        url: `/auth/news/${id}`,
        method: "PATCH",
        body: formData,
      }),
      invalidatesTags: ["update"],
    }),
    deleteNews: builder.mutation({
      query: (id) => ({
        url: `/auth/news/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["update"],
    }),
  }),
});

export const {
  useGetOneNewsQuery,
  useGetAllNewsQuery,
  useGetAllNewsByAdminQuery,
  useCreateNewsMutation,
  useUpdateNewsMutation,
  useDeleteNewsMutation,
} = newsApi;
