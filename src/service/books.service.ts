import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const BooksService = createApi({
  reducerPath: 'BooksService',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://www.googleapis.com/books/v1' }),

  endpoints: (builder) => ({
    getBooks: builder.query({
      query: ({ query }) => ({
        url: `/volumes?q=${query}&langRestrict=en&filter=paid-ebooks`, //filter to get prices bc some books don't have
        method: 'GET',
      }),
    }),
  }),
});

export const { useLazyGetBooksQuery } = BooksService;
