import { ICategory } from "@/types/category.type";
import apiSlice from "../api/apiSlice";

const categoryApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllCategories: builder.query({
      query: () => ({
        method: "GET",
        url: "/category",
      }),
      providesTags: ["category"],
    }),
    deleteCategory: builder.mutation({
      query: ({ ids }: { ids: string[] }) => ({
        method: "DELETE",
        url: `/category`,
        body: ids,
      }),
      invalidatesTags: ["category"],
    }),
    updateCategory: builder.mutation({
      query: ({ categories }: { categories: ICategory[] }) => ({
        method: "PATCH",
        url: `/category`,
        body: categories,
      }),
      invalidatesTags: ["category"],
    }),
    createCategory: builder.mutation({
      query: ({ data }: { data: { name: string }[] }) => ({
        method: "POST",
        url: `/category/create`,
        body: data,
      }),
      invalidatesTags: ["category"],
    }),
  }),
});

export const {
  useGetAllCategoriesQuery,
  useDeleteCategoryMutation,
  useUpdateCategoryMutation,
  useCreateCategoryMutation,
} = categoryApi;
