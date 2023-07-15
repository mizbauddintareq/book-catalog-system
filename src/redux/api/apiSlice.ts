/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000/api/v1" }),
  tagTypes: ["Comments"],
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
} = api;
