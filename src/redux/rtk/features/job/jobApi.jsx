import { apiSlice } from "../api/apiSlice";

export const contactApi = apiSlice.injectEndpoints({
  tagTypes: ["update"],
  endpoints: (builder) => ({
    getOneJob: builder.query({
      query: (id) => ({
        url: `/auth/job/${id}`,
        method: "GET",
      }),
      providesTags: ["update"],
    }),
    getAllJobDefault: builder.query({
      query: () => ({
        url: "/auth/job/default",
        method: "GET",
      }),
      providesTags: ["update"],
    }),
    getAllJobByAdmin: builder.query({
      query: ({ search, status, page, limit }) => ({
        url: `/auth/job/admin?search=${search}&status=${status}&page=${page}&limit=${limit}`,
        method: "GET",
      }),
      providesTags: ["update"],
    }),
    updateJobStatus: builder.mutation({
      query: ({ status, id }) => ({
        url: `/auth/job/${id}`,
        method: "PATCH",
        body: { status },
      }),
      invalidatesTags: ["update"],
    }),
    deleteJob: builder.mutation({
      query: (id) => ({
        url: `/auth/job/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["update"],
    }),
  }),
});

export const {
  useGetOneJobQuery,
  useGetAllJobByAdminQuery,
  useGetAllJobDefaultQuery,
  useUpdateJobStatusMutation,
  useDeleteJobMutation,
} = contactApi;
