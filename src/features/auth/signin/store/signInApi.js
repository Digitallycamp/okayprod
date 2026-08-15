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

		googleSignin: build.mutation({
			query: (token) => {
				console.log(token);
				return {
					url: 'auth/google',
					method: 'POST',
					body: { token: token },
				};
			},
		}),

		getMe: build.query({
			query: () => ({
				url: 'auth/me',
				method: 'GET',
			}),
		}),

		logout: build.mutation({
			query: () => {
				return {
					url: 'auth/logout',
					method: 'POST',
				};
			},
		}),
	}),
});

export const {
	useSignInMutation,
	useGoogleSigninMutation,
	useGetMeQuery,
	useLogoutMutation,
} = signInApi;
