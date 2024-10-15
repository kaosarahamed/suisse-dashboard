import { apiSlice } from "../api/apiSlice";

export const paymentApi = apiSlice.injectEndpoints({
  tagTypes: ["update"],
  endpoints: (builder) => ({
    getOnePayment: builder.query({
      query: (id) => ({
        url: `/auth/payment/${id}`,
        method: "GET",
      }),
      providesTags: ["update"],
    }),
    getAllTransactions: builder.query({
      query: () => ({
        url: "/auth/payment/transaction",
        method: "GET",
      }),
      providesTags: ["update"],
    }),
    createPayment: builder.mutation({
      query: ({ item, id }) => ({
        url: `/auth/payment/${id}`,
        method: "POST",
        body: item,
      }),
      invalidatesTags: ["update"],
    }),
    createCreditsPayment: builder.mutation({
      query: (item) => ({
        url: `/auth/payment/credit`,
        method: "POST",
        body: item,
      }),
      invalidatesTags: ["update"],
    }),
    updatePayment: builder.mutation({
      query: ({ emails, id }) => ({
        url: `/auth/payment/${id}`,
        method: "PATCH",
        body: emails,
      }),
      invalidatesTags: ["update"],
    }),

    deletePayment: builder.mutation({
      query: (id) => ({
        url: `/auth/payment/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["update"],
    }),
  }),
});

export const {
  useGetOnePaymentQuery,
  useGetAllTransactionsQuery,
  useCreatePaymentMutation,
  useCreateCreditsPaymentMutation,
  useUpdatePaymentMutation,
  useDeletePaymentMutation,
} = paymentApi;
