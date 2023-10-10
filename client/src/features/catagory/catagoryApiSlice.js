import { apiSlice } from "../../app/api/apiSlice";

export const catagoryApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCatagories: builder.query({
      query: () => ({
        url: "/catagory",
        ValidityState: (response, result) =>
          response.status === 200 && !result.error,
      }),
      providesTags: (result, error, arg) => {
        if (!result?.catagories) return [{ type: "Catagory", id: "All" }];
        return [
          { type: "Catagory", id: "All" },
          ...result.catagories.map((catagory) => ({
            type: "Catagory",
            id: catagory._id,
          })),
        ];
      },
    }),
    createCatagory: builder.mutation({
      query: (catagory) => {
        return {
          url: "/catagory",
          method: "POST",
          body: catagory,
          formData: true,
        };
      },
      invalidatesTags: [{ type: "Catagory", id: "All" }],
    }),
    updateCatagory: builder.mutation({
      query: ({ catagory, id }) => {
        console.log({id})
        return {
          url: `/catagory/${id}`,
          method: "PATCH",
          body: catagory,
          formData: true,
        };
      },
      invalidatesTags: (result, error, arg) => [
        { type: "Catagory", id: arg.id },
      ],
    }),
    deleteCatagory: builder.mutation({
      query: (id) => {
        return {
          url: `/catagory/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: (result, error, arg) => [
        { type: "Catagory", id: arg.id },
      ],
    }),
  }),
});

export const {
  useGetCatagoriesQuery,
  useCreateCatagoryMutation,
  useUpdateCatagoryMutation,
  useDeleteCatagoryMutation,
} = catagoryApiSlice;
