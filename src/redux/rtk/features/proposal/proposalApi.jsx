import { apiSlice } from "../api/apiSlice";

export const proposalApi = apiSlice.injectEndpoints({
  tagTypes: ["update"],
  endpoints: (builder) => ({
    getOneProposal: builder.query({
      query: (id) => ({
        url: `/auth/proposal/${id}`,
        method: "GET",
      }),
      providesTags: ["update"],
    }),
    getAllProposalsByAdmin: builder.query({
      query: ({ status, page, limit }) => ({
        url: `/auth/proposal/status?status=${status}&page=${page}&limit=${limit}`,
        method: "GET",
      }),
      providesTags: ["update"],
    }),
    updateProposalStatus: builder.mutation({
      query: (formData) => ({
        url: "/auth/proposal/status",
        method: "PATCH",
        body: formData,
      }),
      invalidatesTags: ["update"],
    }),
    deleteProposal: builder.mutation({
      query: (id) => ({
        url: `/auth/proposal/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["update"],
    }),
  }),
});

export const {
  useGetOneProposalQuery,
  useGetAllProposalsByAdminQuery,
  useUpdateProposalStatusMutation,
  useDeleteProposalMutation,
} = proposalApi;
