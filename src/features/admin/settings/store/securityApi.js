import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const securityApi = createApi({
	reducerPath: 'securityApi',
	baseQuery: fetchBaseQuery({
		baseUrl: import.meta.env.VITE_BASE_URL,
		credentials: 'include',
	}),
	tagTypes: ['Security', 'Sessions'],
	endpoints: (build) => ({
		get2FA: build.query({
			query: () => ({
				url: 'security/2fa',
				method: 'GET',
			}),
			providesTags: ['Security'],
		}),

		update2FA: build.mutation({
			query: (twoFactorEnabled) => ({
				url: 'security/2fa',
				method: 'PATCH',
				body: { twoFactorEnabled },
			}),
			invalidatesTags: ['Security'],
		}),

		changePassword: build.mutation({
			query: (payload) => ({
				url: 'security/change-password',
				method: 'POST',
				body: payload,
			}),
		}),

		// NEW: live session list
		getSessions: build.query({
			query: () => ({
				url: 'security/sessions',
				method: 'GET',
			}),
			providesTags: ['Sessions'],
		}),
	}),
});

export const {
	useGet2FAQuery,
	useUpdate2FAMutation,
	useChangePasswordMutation,
	useGetSessionsQuery,
} = securityApi;