import apiSlice from "../api/apiSlice";

const cartApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllCarts: builder.query({
      query: () => ({
        method: "GET",
        url: "/cart",
      }),
      providesTags: ["cart"],
    }),
    getUserCarts: builder.query({
      query: ({ userId }: { userId: string }) => ({
        method: "GET",
        url: `/cart/${userId}`,
      }),
      providesTags: ["cart"],
    }),
    addToCart: builder.mutation({
      query: ({ user, course }: { user: string; course: string }) => ({
        method: "POST",
        url: `/cart`,
        body: { user, course },
      }),
      invalidatesTags: ["cart"],
    }),
    removeCartItem: builder.mutation({
      query: ({ id }: { id: string }) => ({
        method: "DELETE",
        url: `/cart/${id}`,
      }),
      invalidatesTags: ["cart"],
    }),
    checkoutCart: builder.mutation({
      query: ({ userId }: { userId: string }) => ({
        method: "POST",
        url: `/cart/checkout`,
        body: { userId },
      }),
      invalidatesTags: ["cart"],
    }),
  }),
});

export const {
  useGetAllCartsQuery,
  useGetUserCartsQuery,
  useAddToCartMutation,
  useRemoveCartItemMutation,
  useCheckoutCartMutation
} = cartApi;
