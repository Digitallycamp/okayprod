import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const addProductApi = createApi({
  reducerPath: 'addProductApi',

  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BASE_URL,
    credentials: 'include',
  }),

  // 1. Add tagTypes
  tagTypes: ['Product'],

  endpoints: (build) => ({
    createProduct: build.mutation({
      query: (formData) => ({
        url: '/products/create',
        method: 'POST',
        body: formData,
      }),
      // 2. Invalidate cache so the inventory list refetches automatically
      invalidatesTags: ['Product'],
    }),

    // 3. Add the getProducts query
    getProducts: build.query({
      query: () => ({
        url: '/products',
        method: 'GET',
      }),
      providesTags: ['Product'],
    }),
  }),
});

export const {
  useCreateProductMutation,
  useGetProductsQuery, // 4. Export the new hook
} = addProductApi;