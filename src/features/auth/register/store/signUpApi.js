import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// reducerPATH
// baseQuery
// enpoint
// mutation
// query
export const signUpApi = createApi({
	reducerPath: 'signUpApi',
	baseQuery: fetchBaseQuery({
		baseUrl: import.meta.env.VITE_BASE_URL,
	}),
	endpoints: (build) => ({
		signup: build.mutation({
			query(credentials) {
				return {
					url: 'auth/register',
					method: 'POST',
					body: credentials,
				};
			},
		}),
	}),
});

export const { useSignupMutation } = signUpApi;
