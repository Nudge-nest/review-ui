import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IReview } from '../types/review.ts';

export const nudgeNestApi = createApi({
    reducerPath: 'nudgeNestApi',
    tagTypes: ['review', 'media'],
    baseQuery: fetchBaseQuery({
        baseUrl: import.meta.env.VITE_APP_BACKEND_HOST_LOCAL,
    }),
    endpoints: (builder) => {
        return {
            getReview: builder.query({
                query: (reviewId: string) => ({
                    url: `reviews/${reviewId}`,
                    method: 'GET',
                }),
                transformResponse: (response: { data: any }) => response.data,
                providesTags: ['review'],
            }),
            updateReview: builder.mutation({
                query: (review: IReview) => ({
                    url: `reviews/${review.id}`,
                    method: 'PUT',
                    body: { result: review.result, status: review.status },
                }),
                transformResponse: (response: { data: any }) => response.data,
                invalidatesTags: ['review'],
            }),
            uploadReviewMedia: builder.mutation({
                query: (formData) => ({
                    url: `media`,
                    method: 'POST',
                    body: formData,
                }),
                transformResponse: (response: { data: any }) => response.data,
                invalidatesTags: ['media'],
            }),
            deleteReviewMedia: builder.mutation({
                query: (mediaUrl: string) => ({
                    url: `media/${mediaUrl}`,
                    method: 'DELETE',
                }),
                transformResponse: (response: { data: any }) => response.data,
                invalidatesTags: ['media'],
            }),
        };
    },
});

export const {
    useGetReviewQuery,
    useUpdateReviewMutation,
    useUploadReviewMediaMutation,
    useDeleteReviewMediaMutation,
} = nudgeNestApi;

export const { endpoints, reducerPath, reducer, middleware } = nudgeNestApi;
