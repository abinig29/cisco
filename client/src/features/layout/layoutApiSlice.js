import { apiSlice } from "../../app/api/apiSlice";

export const layoutApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllLayout: builder.query({
      query: () => ({
        url: "/layout",
        ValidityState: (response, result) =>
          response.status === 200 && !result.error,
      }),
      providesTags: (result, error, arg) => {
        return [{ type: "Layout", id: "All" }];
      },
    }),
    getSingleLayout: builder.query({
      query: (type) => ({
        url: `/layout/${type}`,
        ValidityState: (response, result) =>
          response.status === 200 && !result.error,
      }),
      providesTags: (result, error, arg) => {
        return [{ type: arg.type }];
      },
    }),
    createLayout: builder.mutation({
      query: (layoutBody) => {
        return {
          url: "layout",
          method: "POST",
          body: layoutBody,
          formData: true,
        };
      },
      invalidatesTags: (result, error, arg) => [
        { type: arg.layoutBody.type },
        { type: "Layout", id: "All" },
      ],
    }),
    updateLayout: builder.mutation({
      query: (layoutBody) => {
        return {
          url: `/layout/update`,
          method: "PATCH",
          body: layoutBody,
          formData: true,
        };
      },
      invalidatesTags: (result, error, arg) => [
        { type: arg.layoutBody.type },
        { type: "Layout", id: "All" },
      ],
    }),
    deleteLayout: builder.mutation({
      query: (type) => {
        return {
          url: `/layout/${type}`,
          method: "DELETE",
        };
      },
      invalidatesTags: (result, error, arg) => [
        { type: arg.type },
        { type: "Layout", id: "All" },
      ],
    }),
  }),
});

export const {
  useGetAllLayoutQuery,
  useGetSingleLayoutQuery,
  useCreateLayoutMutation,
  useUpdateLayoutMutation,
  useDeleteLayoutMutation,
} = layoutApiSlice;
