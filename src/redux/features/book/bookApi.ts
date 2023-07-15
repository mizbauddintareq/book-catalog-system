/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { api } from "../../api/apiSlice";

const bookApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getAllBooks: builder.query({
      query: () => "/books",
      providesTags: ["Comments"],
    }),
    getLatestBooks: builder.query({
      query: () => "/books/latest",
    }),
    getSingleBook: builder.query({
      query: (id) => `/books/${id}`,
      providesTags: ["Comments"],
    }),
    addBook: builder.mutation({
      query: (bookInfo) => ({
        url: "/books/addBook",
        method: "POST",
        body: bookInfo,
      }),
    }),

    addComment: builder.mutation({
      query: ({ data, id }) => ({
        url: `/books/${id}`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Comments"],
    }),

    editBook: builder.mutation({
      query: ({ data, id }) => ({
        url: `/books/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Comments"],
    }),

    deleteBook: builder.mutation({
      query: (id) => ({
        url: `/books/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Comments"],
    }),
  }),
});

export const {
  useGetAllBooksQuery,
  useAddBookMutation,
  useGetLatestBooksQuery,
  useGetSingleBookQuery,
  useAddCommentMutation,
  useEditBookMutation,
  useDeleteBookMutation,
} = bookApi;
