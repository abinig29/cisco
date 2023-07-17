import { apiSlice } from "../../app/api/apiSlice";
import { createEntityAdapter, createSelector } from "@reduxjs/toolkit";

const registreesAdapter = createEntityAdapter();
const registreeIntialState = registreesAdapter.getInitialState();

export const registreeApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getRegistrees: builder.query({
      query: () => ({
        url: "/registree",
      }),
      validateStatus: (response, result) => {
        return response.status === 200 && !result.isError;
      },
      transformResponse: (response) => {
        return response;
      },
      transformResponse: (response) => {
        const users = response.map((user) => {
          user.id = user._id;
          delete user._id;
          return user;
        });
        return registreesAdapter.setAll(registreeIntialState, users);
      },

      providesTags: (result, error, arg) => {
        if (!result?.ids) return [{ type: "Registree", id: "All" }];
        return [
          { type: "Registree", id: "All" },
          ...result.ids.map((id) => ({ type: "Registree", id })),
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
      query: ({ user, id }) => {
        return {
          url: `/registree/${id}`,
          method: "PATCH",
          body: user,
        };
      },
      async onQueryStarted(
        { id, user },
        { dispatch, queryFulfilled, getState }
      ) {
        const patchResult = dispatch(
          registreeApiSlice.util.updateQueryData(
            "getRegistrees",
            "undefined",
            (draft) => {
              console.log(draft, "draft");
              const registree = draft.entities[id];
              if (registree) registree.status = user.status;
            }
          )
        );
        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
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
