import { useState, useCallback } from 'react';
import { IReview, IReviewResult, IUploadedMediaObject } from '../types/review';
import { useDeleteReviewMediaMutation, useUpdateReviewMutation } from '../redux/nudgenest.ts';

const extractReviewResultRatings = (review: IReview): IReviewResult[] => {
    if (!review.result) return [];
    else return review.result?.filter((res: any) => res.value);
};

const extractReviewResultMedia = (review: IReview): IUploadedMediaObject[] => {
    if (!review.result) return [];
    else return review.result?.filter((res: any) => res.mediaURL).map((res: any) => res);
};

const extractReviewResultsComment = (review: IReview): string => {
    if (!review || !review.result) return '';
    const commentObject = review.result?.find((res: any) => res.comment);
    // @ts-ignore
    return commentObject ? commentObject?.comment : '';
};

export const useReviewForm = (initialData: IReview) => {
    const initialRatings = extractReviewResultRatings(initialData);
    const initialMedia = extractReviewResultMedia(initialData);
    const initialComment = extractReviewResultsComment(initialData);
    const [ratings, setRatings] = useState<IReviewResult[]>(initialRatings);
    const [media, setMedia] = useState<IUploadedMediaObject[]>(initialMedia);
    const [comment, setComment] = useState<string>(initialComment);
    const [isSubmitting, setIsSubmitting] = useState(undefined);
    const [deleteReviewMedia] = useDeleteReviewMediaMutation();
    const [updateReview] = useUpdateReviewMutation();

    console.log('USeReviewForm', initialData, ratings, media, comment);

    const updateRating = useCallback((rating: { id: string; value: number }) => {
        if (rating.value < 1 || rating.value > 5) return; // Validation
        const index = ratings.findIndex((result) => result.id === rating.id);
        if (index !== -1) {
            const updated = [...ratings];
            updated[index] = rating;
            return updated;
        }
        setRatings([...ratings, rating]);
    }, []);

    const addMedia = useCallback((file: IUploadedMediaObject[]) => {
        setMedia((prev) => [...prev, ...file]);
    }, []);

    const removeMedia = useCallback(async (media: { id: string; mediaURL: string }) => {
        if (!media) return;
        await deleteReviewMedia(media.mediaURL);
        console.log('Removing media', media);
        setMedia((prev) => prev.filter((m) => m.id !== media.id));
    }, []);

    const updateComment = useCallback((newComment: string) => {
        // Sanitize comment
        const sanitized = newComment.trim().slice(0, 1000); // Max 1000 chars
        setComment(sanitized);
    }, []);

    const resetForm = useCallback(() => {
        setRatings([]);
        setMedia([]);
        setComment('');
    }, []);

    const handleSubmitReview = async () => {
        if (comment === '' || ratings.length === 0) return;
        const finalReviewData = {
            ...initialData,
            result: [...ratings, ...media, { comment: comment }],
        };
        try {
            await updateReview(finalReviewData); // optional: normalize before sending
        } catch (e) {
            console.error('Error updating review:', e);
        }
        console.log('Final Submission');
    };

    return {
        ratings,
        media,
        comment,
        isSubmitting,
        setIsSubmitting,
        updateRating,
        addMedia,
        removeMedia,
        updateComment,
        resetForm,
        handleSubmitReview,
    };
};
