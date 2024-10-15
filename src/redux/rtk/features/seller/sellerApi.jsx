import { apiSlice } from "../api/apiSlice";

export const sellerApi = apiSlice.injectEndpoints({
  tagTypes: ["update"],
  endpoints: (builder) => ({
    getOneSeller: builder.query({
      query: (id) => ({
        url: `/auth/seller/${id}`,
        method: "GET",
      }),
      providesTags: ["update"],
    }),
    getAllSellers: builder.query({
      query: ({ status, page, limit }) => ({
        url: `/auth/seller/access/admin?status=${status}&page=${page}&limit=${limit}`,
        method: "GET",
      }),
      providesTags: ["update"],
    }),
    createSeller: builder.mutation({
      query: (seller) => ({
        url: "/auth/seller/admin",
        method: "POST",
        body: seller,
      }),
      invalidatesTags: ["update"],
    }),
    updateSellerStatus: builder.mutation({
      query: ({ id, role, status }) => ({
        url: "/auth/seller/access/status",
        method: "PATCH",
        body: { id, role, status },
      }),
      invalidatesTags: ["update"],
    }),
    deleteSeller: builder.mutation({
      query: (id) => ({
        url: `/auth/seller/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["update"],
    }),
  }),
});

export const {
  useGetOneSellerQuery,
  useGetAllSellersQuery,
  useUpdateSellerStatusMutation,
  useCreateSellerMutation,
  useDeleteSellerMutation,
} = sellerApi;
