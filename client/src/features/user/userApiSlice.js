import { apiSlice } from "../../app/api/apiSlice";
import { createEntityAdapter, createSelector } from "@reduxjs/toolkit";

const usersAdapter = createEntityAdapter();
const userIntialState = usersAdapter.getInitialState();

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: () => ({
        url: "/user",
        ValidityState: (response, result) =>
          response.status === 200 && !result.error,
      }),
      transformResponse: (response) => {
        const users = response.map((user) => {
          user.id = user._id;
          delete user._id;
          return user;
        });
        return usersAdapter.setAll(userIntialState, users);
      },
      providesTags: (result, error, arg) => [
        { type: "User", id: "All" },
        ...result.ids.map((id) => ({ type: "User", id })),
      ],
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
      query: (user, id) => ({
        url: `/user/${id}`,
        method: "PATCH",
        body: user,
        formData: true,
      }),
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

const memoizedSelector = createSelector(
  userResultSelector,
  (userResult) => userResult.data
);
export const {
  selectAll: selectAllUsers,
  selectById: selectUserbyId,
  selectIds,
} = usersAdapter.getSelectors(
  (state) => memoizedSelector(state) ?? userIntialState
);

// export const selectLectureCourses = createSelector(
//   [selectAllCourses, (state, userId) => userId],
//   (allCourses, userId) =>
//     allCourses.filter((course) => course.lecture.includes(userId))
// );
