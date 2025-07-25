import { useGetReviewQuery, useUpdateReviewMutation } from '../redux/nudgenest.ts';
import { useMemo } from 'react';
import defaultReview from '../defaultReview.json';

const getDemoReview = () => defaultReview;

export const useReviewData = (reviewId: string) => {
    const skipFetch = !reviewId || reviewId === 'demo';
    const { data, isError, isLoading, isFetching } = useGetReviewQuery(reviewId as string, { skip: skipFetch });
    const [updateReview] = useUpdateReviewMutation();
    const review = useMemo(() => {
        if (reviewId === 'demo') return getDemoReview();
        return data || null;
    }, [data, reviewId]);

    console.log('Review data', review);

    return {
        review,
        isLoading,
        isError,
        isFetching,
        reviewProducts: review ? review.items : [],
        reviewResults: review ? review.results : [],
        reviewStatus: review ? review.status : null,
        updateReview,
        merchantId: review ? review.merchantId : null,
    };
};
