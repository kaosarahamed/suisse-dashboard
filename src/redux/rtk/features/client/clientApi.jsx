import { apiSlice } from "../api/apiSlice";

export const clientApi = apiSlice.injectEndpoints({
  tagTypes: ["update"],
  endpoints: (builder) => ({
    getOneClientById: builder.query({
      query: (id) => ({
        url: `/auth/client/${id}`,
        method: "GET",
      }),
      providesTags: ["update"],
    }),
    getAllClients: builder.query({
      query: ({ status, page, limit }) => ({
        url: `/auth/client/access/admin?status=${status}&page=${page}&limit=${limit}`,
        method: "GET",
      }),
      providesTags: ["update"],
    }),
    createClient: builder.mutation({
      query: (client) => ({
        url: "/auth/client/admin",
        method: "POST",
        body: client,
      }),
      invalidatesTags: ["update"],
    }),
    updateClientStatus: builder.mutation({
      query: ({ status, id }) => ({
        url: "/auth/client/access/admin",
        method: "PATCH",
        body: { status, id },
      }),
      invalidatesTags: ["update"],
    }),
    deleteClient: builder.mutation({
      query: (id) => ({
        url: `/auth/client/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["update"],
    }),
  }),
});

export const {
  useGetOneClientByIdQuery,
  useGetAllClientsQuery,
  useCreateClientMutation,
  useUpdateClientStatusMutation,
  useDeleteClientMutation,
} = clientApi;
