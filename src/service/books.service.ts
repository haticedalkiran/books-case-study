import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const BooksService = createApi({
  reducerPath: 'BooksService',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://www.googleapis.com/books/v1' }),

  endpoints: (builder) => ({
    getBooks: builder.query({
      query: ({ query }) => ({
        url: `https://www.googleapis.com/books/v1/volumes?q=${query}&langRestrict=en&maxResults=20`,
        method: 'GET',
      }),
    }),
  }),
});

export const { useLazyGetBooksQuery } = BooksService;
