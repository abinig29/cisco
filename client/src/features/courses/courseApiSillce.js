import { apiSlice } from "../../app/api/apiSlice";
import { createEntityAdapter, createSelector } from "@reduxjs/toolkit";

const coursesAdapter = createEntityAdapter();
const courseIntialState = coursesAdapter.getInitialState();
const boudary = "------WebKitFormBoundaryE4UqueJ6YJh4pOrA";

export const courseApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCourses: builder.query({
      query: () => ({
        url: "/course",
        ValidityState: (response, result) =>
          response.status === 200 && !result.error,
      }),
      transformResponse: (response) => {
        const courses = response.courses.map((course) => {
          course.id = course._id;
          delete course._id;
          return course;
        });
        return coursesAdapter.setAll(courseIntialState, courses);
      },
      providesTags: (result, error, arg) => [
        { type: "Course", id: "All" },
        ...result.ids.map((id) => ({ type: "Course", id })),
      ],
    }),
    createCourse: builder.mutation({
      query: (course) => {
        return {
          url: "course",
          method: "POST",
          body: course,
          formData: true,
        };
      },
      invalidatesTags: [{ type: "Course", id: "All" }],
    }),
    updateCourse: builder.mutation({
      query: (course, id) => ({
        url: `/course/${id}`,
        method: "PATCH",
        body: course,
        formData: true,
      }),
      invalidatesTags: (result, error, arg) => [{ type: "Course", id: arg.id }],
    }),
    deleteCourse: builder.mutation({
      query: (id) => ({
        url: `/course/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, arg) => [{ type: "Course", id: arg.id }],
    }),
  }),
});

export const {
  useGetCoursesQuery,
  useCreateCourseMutation,
  useUpdateCourseMutation,
  useDeleteCourseMutation,
} = courseApiSlice;
const courseResultSelector = courseApiSlice.endpoints.getCourses.select();

const memoizedSelector = createSelector(
  courseResultSelector,
  (courseResult) => courseResult.data
);
export const {
  selectAll: selectAllCourses,
  selectById: selectCoursebyId,
  selectIds,
} = coursesAdapter.getSelectors(
  (state) => memoizedSelector(state) ?? courseIntialState
);

export const selectLectureCourses = createSelector(
  [selectAllCourses, (state, userId) => userId],
  (allCourses, userId) =>
    allCourses.filter((course) => course.lecture.includes(userId))
);
