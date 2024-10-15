import { apiSlice } from "../api/apiSlice";

export const createApi = apiSlice.injectEndpoints({
  tagTypes: ["update"],
  endpoints: (builder) => ({
    getOneCredits: builder.query({
      query: (id) => ({
        url: `/auth/credit/${id}`,
        method: "GET",
      }),
      providesTags: ["update"],
    }),
    getAllCredits: builder.query({
      query: ({ page, limit }) => ({
        url: `/auth/credit?page=${page}&limit=${limit}`,
        method: "GET",
      }),
      providesTags: ["update"],
    }),
    getAllCreditsByAdmin: builder.query({
      query: ({ status, page, limit }) => ({
        url: `/auth/credit?status=${status}&page=${page}&limit=${limit}`,
        method: "GET",
      }),
      providesTags: ["update"],
    }),

    createCredits: builder.mutation({
      query: (formData) => ({
        url: "/auth/credit",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["update"],
    }),
    updateCredits: builder.mutation({
      query: ({ formData, id }) => ({
        url: `/auth/credit/${id}`,
        method: "PATCH",
        body: formData,
      }),
      invalidatesTags: ["update"],
    }),
    deleteCredits: builder.mutation({
      query: (id) => ({
        url: `/auth/credit/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["update"],
    }),
  }),
});

export const {
  useGetOneCreditsQuery,
  useGetAllCreditsQuery,
  useGetAllCreditsByAdminQuery,
  useCreateCreditsMutation,
  useUpdateCreditsMutation,
  useDeleteCreditsMutation,
} = createApi;
