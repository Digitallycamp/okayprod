import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const addProductApi = createApi({
  reducerPath: 'addProductApi',

  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BASE_URL,
    credentials: 'include',
  }),

  endpoints: (build) => ({
    createProduct: build.mutation({
      query: (formData) => ({
        url: '/products/create',
        method: 'POST',
        body: formData,
      }),
    }),
  }),
});

export const {
  useCreateProductMutation,
} = addProductApi;