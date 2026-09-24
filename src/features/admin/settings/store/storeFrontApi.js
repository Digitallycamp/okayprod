import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const storefrontApi = createApi({
	reducerPath: 'storefrontApi',
	baseQuery: fetchBaseQuery({
		baseUrl: import.meta.env.VITE_BASE_URL,
		credentials: 'include',
	}),
	tagTypes: ['Storefront'],
	endpoints: (build) => ({
		getStorefront: build.query({
			query: () => ({
				url: 'storefront',
				method: 'GET',
			}),
			providesTags: ['Storefront'],
		}),

		updateStorefront: build.mutation({
			query: (payload) => ({
				url: 'storefront',
				method: 'PATCH',
				body: payload,
			}),
			invalidatesTags: ['Storefront'],
		}),

		// NEW: Logo upload — multipart/form-data
		uploadLogo: build.mutation({
			query: (formData) => ({
				url: 'storefront/logo',
				method: 'PATCH',
				body: formData,
				// IMPORTANT: Do NOT set Content-Type manually.
				// The browser sets multipart/form-data with the correct boundary.
			}),
			invalidatesTags: ['Storefront'],
		}),
	}),
});

export const {
	useGetStorefrontQuery,
	useUpdateStorefrontMutation,
	useUploadLogoMutation,
} = storefrontApi;