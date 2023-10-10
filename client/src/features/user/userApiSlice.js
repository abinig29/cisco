import { apiSlice } from "../../app/api/apiSlice";

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: () => ({
        url: "/user",
        ValidityState: (response, result) =>
          response.status === 200 && !result.error,
      }),
      providesTags: (result, error, arg) => {
        if (!result?.users) return [{ type: "User", id: "All" }];
        return [
          { type: "User", id: "All" },
          ...result.users.map((user) => ({ type: "User", id:user._id })),
        ];
      },
    }),
    createUser: builder.mutation({
      query: (user) => {
        return {
          url: "user",
          method: "POST",
          body: user,
          formData: true,
        };
      },
      invalidatesTags: [{ type: "User", id: "All" }],
    }),
    updateUser: builder.mutation({
      query: ({ user, id }) => {
        return {
          url: `/user/${id}`,
          method: "PATCH",
          body: user,
          formData: true,
        };
      },
      invalidatesTags: (result, error, arg) => [{ type: "User", id: arg.id }],
    }),
    deleteUser: builder.mutation({
      query: (id) => ({
        url: `/user/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, arg) => [{ type: "User", id: arg.id }],
    }),
  }),
});

export const {
  useGetUsersQuery,
  useCreateUserMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
} = userApiSlice;
const userResultSelector = userApiSlice.endpoints.getUsers.select();
