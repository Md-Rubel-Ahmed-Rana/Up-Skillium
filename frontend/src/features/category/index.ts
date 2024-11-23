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
      query: ({ id }: { id: string }) => ({
        method: "DELETE",
        url: `/category/${id}`,
      }),
      invalidatesTags: ["category"],
    }),
    updateCategory: builder.mutation({
      query: ({ id, name }: { id: string; name: string }) => ({
        method: "DELETE",
        url: `/category/${id}`,
        body: { name },
      }),
      invalidatesTags: ["category"],
    }),
  }),
});

export const {
  useGetAllCategoriesQuery,
  useDeleteCategoryMutation,
  useUpdateCategoryMutation,
} = categoryApi;
