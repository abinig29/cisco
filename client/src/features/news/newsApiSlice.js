import { apiSlice } from "../../app/api/apiSlice";


export const newsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getNews: builder.query({
      query: () => ({
        url: "/news",
        ValidityState: (response, result) =>
          response.status === 200 && !result.error,
      }),
      providesTags: (result, error, arg) => {
        if (!result?.news) return [{ type: "News", id: "All" }];
        return [
          { type: "News", id: "All" },
          ...result.news.map((n) => ({
            type: "News",
            id: n._id,
          })),
        ];
      },
    }),
    createNews: builder.mutation({
      query: (news) => {
        return {
          url: "news",
          method: "POST",
          body: news,
          formData: true,
        };
      },
      invalidatesTags: [{ type: "News", id: "All" }],
    }),
    updateNews: builder.mutation({
      query: ({ news, id }) => {
        return {
          url: `/news/${id}`,
          method: "PATCH",
          body: news,
          formData: true,
        };
      },
      invalidatesTags: (result, error, arg) => [{ type: "News", id: arg.id }],
    }),
    deleteNews: builder.mutation({
      query: (id) => {
        return {
          url: `/news/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: (result, error, arg) => [{ type: "News", id: arg.id }],
    }),
  }),
});

export const {
  useGetNewsQuery,
  useCreateNewsMutation,
  useUpdateNewsMutation,
  useDeleteNewsMutation,
} = newsApiSlice;
