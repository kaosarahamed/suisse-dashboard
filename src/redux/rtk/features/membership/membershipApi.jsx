import { apiSlice } from "../api/apiSlice";

export const membershipApi = apiSlice.injectEndpoints({
  tagTypes: ["update"],
  endpoints: (builder) => ({
    getOneMembership: builder.query({
      query: (id) => ({
        url: `/auth/membership/${id}`,
        method: "GET",
      }),
      providesTags: ["update"],
    }),
    getAllMembership: builder.query({
      query: ({ page, limit }) => ({
        url: `/auth/membership?page=${page}&limit=${limit}`,
        method: "GET",
      }),
      providesTags: ["update"],
    }),
    getAllMembershipByAdmin: builder.query({
      query: ({ status, page, limit }) => ({
        url: `/auth/membership?status=${status}&page=${page}&limit=${limit}`,
        method: "GET",
      }),
      providesTags: ["update"],
    }),

    createMembership: builder.mutation({
      query: (formData) => ({
        url: "/auth/membership",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["update"],
    }),
    updateMembership: builder.mutation({
      query: ({ formData, id }) => ({
        url: `/auth/membership/${id}`,
        method: "PATCH",
        body: formData,
      }),
      invalidatesTags: ["update"],
    }),
    deleteMembership: builder.mutation({
      query: (id) => ({
        url: `/auth/membership/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["update"],
    }),
  }),
});

export const {
  useGetOneMembershipQuery,
  useGetAllMembershipQuery,
  useGetAllMembershipByAdminQuery,
  useCreateMembershipMutation,
  useUpdateMembershipMutation,
  useDeleteMembershipMutation,
} = membershipApi;
