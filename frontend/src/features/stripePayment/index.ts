import { ICheckout } from "@/types/checkout.type";
import apiSlice from "../api/apiSlice";

const stripePaymentApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    makeStripeCheckout: builder.mutation({
      query: (data: ICheckout) => ({
        method: "POST",
        url: `/stripe/checkout`,
        body: data,
      }),
    }),
  }),
});

export const { useMakeStripeCheckoutMutation } = stripePaymentApi;
