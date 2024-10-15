import { apiSlice } from "../api/apiSlice";

export const reviewApi = apiSlice.injectEndpoints({
  tagTypes: ["update"],
  endpoints: (builder) => ({
    getOneReview: builder.query({
      query: (id) => ({
        url: `/auth/review/single/${id}`,
        method: "GET",
      }),
      providesTags: ["update"],
    }),
    getAllReview: builder.query({
      query: ({ status, page, limit }) => ({
        url: `/auth/review/admin?status=${status}&page=${page}&limit=${limit}`,
        method: "GET",
      }),
      providesTags: ["update"],
    }),
    createReview: builder.mutation({
      query: (reviewData) => ({
        url: "/auth/review",
        method: "POST",
        body: reviewData,
      }),
      invalidatesTags: ["update"],
    }),
    updateReviewStatus: builder.mutation({
      query: ({ status, id }) => ({
        url: "/auth/review/status",
        method: "PATCH",
        body: { status, id },
      }),
      invalidatesTags: ["update"],
    }),
    deleteReview: builder.mutation({
      query: (id) => ({
        url: `/auth/review/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["update"],
    }),
  }),
});

export const {
  useGetOneReviewQuery,
  useGetAllReviewQuery,
  useCreateReviewMutation,
  useUpdateReviewStatusMutation,
  useDeleteReviewMutation,
} = reviewApi;
