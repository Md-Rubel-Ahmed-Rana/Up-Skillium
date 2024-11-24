import { IRole } from "@/types/role.type";
import apiSlice from "../api/apiSlice";

const roleApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllRoles: builder.query({
      query: () => ({
        method: "GET",
        url: `/role`,
      }),
      providesTags: ["role"],
    }),
    updateRole: builder.mutation({
      query: ({ id, data }: { id: string; data: IRole }) => ({
        method: "PATCH",
        url: `/role/${id}`,
        body: data,
      }),
      invalidatesTags: ["role"],
    }),
    addNewRole: builder.mutation({
      query: ({ data }: { data: { name: string; permissions: string[] } }) => ({
        method: "POST",
        url: `/role/add`,
        body: data,
      }),
      invalidatesTags: ["role"],
    }),
  }),
});

export const {
  useGetAllRolesQuery,
  useUpdateRoleMutation,
  useAddNewRoleMutation,
} = roleApi;
