import { apiSlice } from "../api/apiSlice";
import { loggedIn } from "./authSlice";

export const adminAuthApi = apiSlice.injectEndpoints({
  tagTypes: ["update"],
  endpoints: (builder) => ({
    getOneAdmin: builder.query({
      query: (id) => ({
        url: `/auth/admin/${id}`,
        method: "GET",
      }),
      providesTags: ["update"],
    }),
    getAllAdmin: builder.query({
      query: () => ({
        url: "/auth/admin",
        method: "GET",
      }),
      providesTags: ["update"],
    }),
    registerAdmin: builder.mutation({
      query: (admin) => ({
        url: "/auth/admin/register",
        method: "POST",
        body: admin,
      }),
    }),
    updateAdmin: builder.mutation({
      query: ({ formData, id }) => ({
        url: `/auth/admin/${id}`,
        method: "PATCH",
        body: formData,
      }),
      invalidatesTags: ["update"],
    }),
    updateAdminPass: builder.mutation({
      query: ({ password, id }) => ({
        url: `/auth/admin/password/${id}`,
        method: "PATCH",
        body: password,
      }),
      invalidatesTags: ["update"],
    }),
    deleteAdmin: builder.mutation({
      query: (id) => ({
        url: `/auth/admin/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["update"],
    }),
    loginAdmin: builder.mutation({
      query: (admin) => ({
        url: "/auth/admin/login",
        method: "POST",
        body: admin,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          localStorage.setItem(
            "admin",
            JSON.stringify({
              token: result.data.token,
              admin: result.data.admin,
            })
          );
          dispatch(
            loggedIn({
              token: result.data.token,
              admin: result.data.admin,
            })
          );
        } catch (error) {
          // Do Nothning
        }
      },
    }),
    sendOTPAdmin: builder.mutation({
      query: (email) => ({
        url: "/auth/admin/otp",
        method: "POST",
        body: { email },
      }),
    }),
    checkOTPAdmin: builder.mutation({
      query: ({ code }) => ({
        url: "/auth/admin/otp/check",
        method: "POST",
        body: { code },
      }),
    }),
    changeOTPAdmin: builder.mutation({
      query: (admin) => ({
        url: "/auth/admin/change",
        method: "POST",
        body: admin,
      }),
    }),
  }),
});

export const {
  useGetOneAdminQuery,
  useGetAllAdminQuery,
  useRegisterAdminMutation,
  useLoginAdminMutation,
  useSendOTPAdminMutation,
  useCheckOTPAdminMutation,
  useChangeOTPAdminMutation,
  useUpdateAdminMutation,
  useUpdateAdminPassMutation,
  useDeleteAdminMutation,
} = adminAuthApi;
