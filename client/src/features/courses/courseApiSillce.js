import { apiSlice } from "../../app/api/apiSlice";

export const courseApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCourses: builder.query({
      query: () => ({
        url: "/course",
        ValidityState: (response, result) =>
          response.status === 200 && !result.error,
      }),
      providesTags: (result, error, arg) => {
        if (!result?.courses) return [{ type: "Course", id: "All" }];
        return [
          { type: "Course", id: "All" },
          ...result.courses.map((course) => ({
            type: "Course",
            id: course._id,
          })),
        ];
      },
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
      invalidatesTags: [{ type: "Course", id: "All" },{ type: "Catagory", id: "All" },],
    }),
    updateCourse: builder.mutation({
      query: ({ course, id }) => {
        return {
          url: `/course/${id}`,
          method: "PATCH",
          body: course,
          formData: true,
        };
      },
      invalidatesTags: (result, error, arg) => [{ type: "Course", id: arg.id },{ type: "Catagory", id: "All" },],
    }),
    deleteCourse: builder.mutation({
      query: (id) => {
        return {
          url: `/course/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: (result, error, arg) => [{ type: "Course", id: arg.id },{ type: "Catagory", id: "All" },],
    }),
  }),
});

export const {
  useGetCoursesQuery,
  useCreateCourseMutation,
  useUpdateCourseMutation,
  useDeleteCourseMutation,
} = courseApiSlice;
