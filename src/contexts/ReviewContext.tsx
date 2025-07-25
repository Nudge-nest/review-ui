import { createContext, FC, ReactNode, useContext } from 'react';
import { useLocation, useParams } from 'react-router';
import ErrorComponent from '../components/ErrorComponent.tsx';
import { IReview } from '../types/review.ts';
import { useReviewData } from '../hooks/useReviewData.ts';
import { useSlider } from '../hooks/useSlider.ts';
import { useReviewForm } from '../hooks/useReviewForm.ts';

interface IReviewContext {
    // Data
    review: IReview | null;
    isLoading: boolean;
    isError: boolean;
    isFetching: boolean;
    reviewId: string;
    merchantId: string;
    reviewResults: any[];
    reviewProducts: any[];
    reviewStatus: string;
    // Form state
    reviewFormHoook: any;
    // Form actions

    // Slider state
    sliderHook: any;
}

const resolveReviewId = (reviewId: string, pathname: string) => {
    if (reviewId && pathname.includes('store')) return 'store-review';
    else return reviewId;
};

const ReviewContext = createContext<IReviewContext | null>(null);

export const ReviewProvider: FC<{ children: ReactNode }> = ({ children }) => {
    const { id } = useParams<{ id: string }>();
    const { pathname } = useLocation();
    const reviewId = resolveReviewId(id as string, pathname);
    const { review, reviewResults, reviewProducts, reviewStatus, isError, isLoading, isFetching } =
        useReviewData(reviewId);
    const sliderHook = useSlider(3);
    const formHook = useReviewForm(review);

    // Error state
    if (isError) return <ErrorComponent message="Nothing to see here!" />;

    return (
        <ReviewContext.Provider
            value={{
                review,
                isLoading,
                isError,
                isFetching,
                reviewId,
                reviewFormHoook: formHook,
                sliderHook,
                merchantId: review?.merchantId,
                reviewResults,
                reviewProducts,
                reviewStatus,
            }}
        >
            {children}
        </ReviewContext.Provider>
    );
};

export const useReview = () => {
    const context = useContext(ReviewContext);
    if (!context) throw new Error('useReview must be used within a ReviewProvider');
    return context;
};
