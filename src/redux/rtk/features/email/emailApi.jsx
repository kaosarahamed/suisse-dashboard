import { apiSlice } from "../api/apiSlice";

export const emailApi = apiSlice.injectEndpoints({
  tagTypes: ["update"],
  endpoints: (builder) => ({
    getOneEmail: builder.query({
      query: (id) => ({
        url: `/auth/contact/${id}`,
        method: "GET",
      }),
      providesTags: ["update"],
    }),
    getAllEmailDefault: builder.query({
      query: () => ({
        url: "/auth/contact/default",
        method: "GET",
      }),
      providesTags: ["update"],
    }),
    getAllEmail: builder.query({
      query: ({ status, page, limit }) => ({
        url: `/auth/contact?status=${status}&page=${page}&limit=${limit}`,
        method: "GET",
      }),
      providesTags: ["update"],
    }),
    createEmail: builder.mutation({
      query: (Email) => ({
        url: "/auth/contact",
        method: "POST",
        body: Email,
      }),
      invalidatesTags: ["update"],
    }),
    updateEmail: builder.mutation({
      query: ({ emails, id }) => ({
        url: `/auth/contact/${id}`,
        method: "PATCH",
        body: emails,
      }),
      invalidatesTags: ["update"],
    }),
    updateEmailStatus: builder.mutation({
      query: ({ status, id }) => ({
        url: "/auth/contact/status",
        method: "PATCH",
        body: { status, id },
      }),
      invalidatesTags: ["update"],
    }),
    deleteEmail: builder.mutation({
      query: (id) => ({
        url: `/auth/contact/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["update"],
    }),
  }),
});

export const {
  useGetOneEmailQuery,
  useGetAllEmailDefaultQuery,
  useGetAllEmailQuery,
  useCreateEmailMutation,
  useUpdateEmailMutation,
  useUpdateEmailStatusMutation,
  useDeleteEmailMutation,
} = emailApi;
