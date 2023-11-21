import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const BooksService = createApi({
  reducerPath: 'BooksService',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://www.googleapis.com/books/v1' }),

  endpoints: (builder) => ({
    getBooks: builder.query({
      query: ({ query }) => ({
        //filter to get prices bc some books don't have
        //here, query cannot be empty string , "" or null
        //Js compiles query="" as query=&... and its not valid
        url: `/volumes?q=${query}&langRestrict=en&filter=paid-ebooks`,
        method: 'GET',
      }),
    }),
    getBookDetails: builder.query({
      query: ({ id }) => ({
        url: `/volumes/${id}`,
        method: 'GET',
      }),
    }),
  }),
});

export const { useLazyGetBooksQuery, useGetBookDetailsQuery } = BooksService;
