import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const transactionApi = createApi({
  reducerPath: 'transactionApi',

  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BASE_URL,
    credentials: 'include',
  }),

  tagTypes: ['Transactions', 'TransactionStats'],

  endpoints: (builder) => ({
    getTransactions: builder.query({
      query: ({
        search = '',
        status = '',
        startDate = '',
        endDate = '',
        page = 1,
        limit = 6,
      } = {}) => ({
        url: '/transactions',
        method: 'GET',
        params: {
          search,
          status,
          startDate,
          endDate,
          page,
          limit,
        },
      }),
      providesTags: ['Transactions'],
    }),

    exportTransactions: builder.query({
      query: ({
        search = '',
        status = '',
        startDate = '',
        endDate = '',
        page = 1,
        limit = 10000,
      } = {}) => ({
        url: '/transactions',
        method: 'GET',
        params: {
          search,
          status,
          startDate,
          endDate,
          page,
          limit,
        },
      }),
    }),

    getTransactionStats: builder.query({
      query: ({
        startDate = '',
        endDate = '',
      } = {}) => ({
        url: '/transactions/stats',
        method: 'GET',
        params: {
          startDate,
          endDate,
        },
      }),
      providesTags: ['TransactionStats'],
    }),

    createTransaction: builder.mutation({
      query: (transactionData) => ({
        url: '/transactions',
        method: 'POST',
        body: transactionData,
      }),
      invalidatesTags: ['Transactions', 'TransactionStats'],
    }),
  }),
});

export const {
  useGetTransactionsQuery,
  useLazyExportTransactionsQuery,
  useGetTransactionStatsQuery,
  useCreateTransactionMutation,
} = transactionApi;