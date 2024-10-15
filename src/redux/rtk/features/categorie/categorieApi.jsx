import { apiSlice } from "../api/apiSlice";

export const categorieApi = apiSlice.injectEndpoints({
  tagTypes: ["update"],
  endpoints: (builder) => ({
    getOneCategory: builder.query({
      query: (id) => ({
        url: `/auth/category/${id}`,
        method: "GET",
      }),
      providesTags: ["update"],
    }),
    getAllCategory: builder.query({
      query: ({ page, limit, status }) => ({
        url: `/auth/category/admin?status=${status}&page=${page}&limit=${limit}`,
        method: "GET",
      }),
      providesTags: ["update"],
    }),

    createCategory: builder.mutation({
      query: (formData) => ({
        url: "/auth/category",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["update"],
    }),
    updateCategory: builder.mutation({
      query: ({ formData, id }) => ({
        url: `/auth/category/${id}`,
        method: "PATCH",
        body: formData,
      }),
      invalidatesTags: ["update"],
    }),
    deleteCategory: builder.mutation({
      query: (id) => ({
        url: `/auth/category/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["update"],
    }),
  }),
});

export const {
  useGetOneCategoryQuery,
  useGetAllCategoryQuery,
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
} = categorieApi;
