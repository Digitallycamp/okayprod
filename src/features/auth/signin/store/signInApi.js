import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const signInApi = createApi({
	reducerPath: 'signInApi',
	baseQuery: fetchBaseQuery({
		baseUrl: import.meta.env.VITE_BASE_URL,
		credentials: 'include',
	}),
	endpoints: (build) => ({
		signIn: build.mutation({
			query: (credentials) => ({
				url: 'auth/login',
				method: 'POST',
				body: credentials,
			}),
		}),

		getMe: build.query({
			query: () => ({
				url: 'auth/me',
				method: 'GET',
			}),
		}),
	}),
});

export const { useSignInMutation, useGetMeQuery } = signInApi;
