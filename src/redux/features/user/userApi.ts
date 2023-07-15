/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { api } from "../../api/apiSlice";

const userApi = api.injectEndpoints({
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

    addToReadList: builder.mutation({
      query: ({ data, id }) => ({
        url: `/users/readingList/${id}`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["User"],
    }),

    updateReadlist: builder.mutation({
      query: ({ data, id }) => ({
        url: `/users/readingList/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["User"],
    }),

    getSingleUser: builder.query({
      query: (id) => `/users/${id}`,
      providesTags: ["User"],
    }),
  }),
});

export const {
  useCreateUserMutation,
  useLoginUserMutation,
  useAddToWishlistMutation,
  useGetSingleUserQuery,
  useAddToReadListMutation,
  useUpdateReadlistMutation,
} = userApi;
