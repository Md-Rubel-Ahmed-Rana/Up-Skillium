import { ICreateLiveClass } from "@/types/liveClass.type";
import apiSlice from "../api/apiSlice";

const liveClassApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createLiveClass: builder.mutation({
      query: ({ data }: { data: ICreateLiveClass }) => ({
        method: "POST",
        url: `/live-class/create`,
        body: data,
      }),
      invalidatesTags: ["live-class"],
    }),
  }),
});

export const { useCreateLiveClassMutation } = liveClassApi;
