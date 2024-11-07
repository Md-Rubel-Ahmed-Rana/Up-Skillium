import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import baseApi from ".";

const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: baseApi,
    credentials: "include",
  }),
  tagTypes: ["lesson", "module", "course", "user"],
  endpoints: () => ({}),
});

export default apiSlice;