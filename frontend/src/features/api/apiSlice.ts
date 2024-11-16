import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import baseApi from ".";

const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: baseApi,
    credentials: "include",
  }),
  tagTypes: [
    "lesson",
    "module",
    "course",
    "user",
    "quiz-submission",
    "course-outline",
    "instructor",
    "certificates",
    "feedback",
  ],
  endpoints: () => ({}),
});

export default apiSlice;
