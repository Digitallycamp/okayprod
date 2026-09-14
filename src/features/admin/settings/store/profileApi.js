import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const profileApi = createApi({
	reducerPath: 'profileApi',
	baseQuery: fetchBaseQuery({
		baseUrl: import.meta.env.VITE_BASE_URL,
		credentials: 'include',
	}),
	tagTypes: ['Profile'],
	endpoints: (build) => ({
		getProfile: build.query({
			query: () => ({
				url: 'profile/me',
				method: 'GET',
			}),
			providesTags: ['Profile'],
		}),

		updateProfile: build.mutation({
			query: (payload) => ({
				url: 'profile/me',
				method: 'PATCH',
				body: payload,
			}),
			invalidatesTags: ['Profile'],
		}),

		// NEW: Avatar upload — multipart/form-data
		uploadAvatar: build.mutation({
			query: (formData) => ({
				url: 'profile/avatar',
				method: 'PATCH',
				body: formData,
			}),
			invalidatesTags: ['Profile'],
		}),
	}),
});

export const {
	useGetProfileQuery,
	useUpdateProfileMutation,
	useUploadAvatarMutation,
} = profileApi;