/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000/api/v1" }),
  tagTypes: ["Comments", "User"],
  endpoints: (builder) => ({
    createUser: builder.mutation({
      query: (loginData) => ({
        url: "/users/signup",
        method: "POST",
        body: loginData,
      }),
    }),
    loginUser: builder.mutation({
      query: (loginData) => ({
        url: "/users/login",
        method: "POST",
        body: loginData,
      }),
    }),
    addToWishlist: builder.mutation({
      query: ({ data, id }) => ({
        url: `/users/wishlist/${id}`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["User"],
    }),

    getSingleUser: builder.query({
      query: (id) => `/users/${id}`,
      providesTags: ["User"],
    }),

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
        url: "/books/addbook",
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
  useCreateUserMutation,
  useLoginUserMutation,
  useGetAllBooksQuery,
  useAddBookMutation,
  useGetLatestBooksQuery,
  useGetSingleBookQuery,
  useAddCommentMutation,
  useEditBookMutation,
  useDeleteBookMutation,
  useAddToWishlistMutation,
  useGetSingleUserQuery,
} = api;
