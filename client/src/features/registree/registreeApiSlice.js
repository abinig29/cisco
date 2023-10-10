import { apiSlice } from "../../app/api/apiSlice";
import { createEntityAdapter, createSelector } from "@reduxjs/toolkit";

const registreesAdapter = createEntityAdapter();
const registreeIntialState = registreesAdapter.getInitialState();

export const registreeApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getRegistrees: builder.query({
      query: (courseId) => ({
        url: `/registree${courseId ? `?courseId=${courseId}`:``}`,
      }),
      validateStatus: (response, result) => {
        return response.status === 200 && !result.isError;
      },

      providesTags: (result, error, arg) => {
        if (!result?.registree) return [{ type: "Registree", id: "All" }];
        return [
          { type: "Registree", id: "All" },
          ...result.registree.map((registree) => ({
            type: "Registree",
            id: registree._id,
          })),
        ];
      },
    }),
    createRegistree: builder.mutation({
      query: (user) => {
        return {
          url: "registree",
          method: "POST",
          body: user,
          formData: true,
        };
      },
      invalidatesTags: [{ type: "Registree", id: "All" }],
    }),
    updateRegistree: builder.mutation({
      query: ({ data, id }) => {
        return {
          url: `/registree/${id}`,
          method: "PATCH",
          body: data,
        };
      },

      invalidatesTags: (result, error, arg) => [
        { type: "Registree", id: arg.id },
      ],
    }),
    deleteRegistree: builder.mutation({
      query: (id) => ({
        url: `/registree/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "Registree", id: arg.id },
      ],
    }),
  }),
});

export const {
  useGetRegistreesQuery,
  useCreateRegistreeMutation,
  useUpdateRegistreeMutation,
  useDeleteRegistreeMutation,
} = registreeApiSlice;
const userResultSelector = registreeApiSlice.endpoints.getRegistrees.select();

const memoizedSelector = createSelector(
  userResultSelector,
  (userResult) => userResult.data
);
export const {
  selectAll: selectAlRegistrees,
  selectById: selectRegistreesbyId,
  selectIds,
} = registreesAdapter.getSelectors(
  (state) => memoizedSelector(state) ?? registreeIntialState
);

// export const selectLectureCourses = createSelector(
//   [selectAllCourses, (state, userId) => userId],
//   (allCourses, userId) =>
//     allCourses.filter((course) => course.lecture.includes(userId))
// );
