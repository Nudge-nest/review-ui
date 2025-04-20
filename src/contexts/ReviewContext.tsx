import { createContext, Dispatch, FC, ReactNode, SetStateAction, useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { useGetReviewQuery, useUpdateReviewMutation } from '../redux/nudgenest.ts';
import { useKeenSlider } from 'keen-slider/react';
import { KeenSliderInstance } from 'keen-slider';
import ErrorComponent from '../components/ErrorComponent.tsx';
import { deleteImageFromS3 } from '../utils/aws.ts';

export interface IReview {
    id: string;
    merchantId: string;
    items: IReviewItem[];
    result: IReviewResult[];
    status: 'Pending' | 'Completed' | 'Failed';
    createdAt: string;
    updatedAt: string;
}

export interface IReviewItem {
    id: string;
    name: string;
    image?: string;
    [key: string]: any;
}

export interface IReviewResult {
    id?: string;
    value?: number;
    media?: IUploadedMediaObject[];
    comment?: string;
}

export interface IUploadedMediaObject {
    id: string;
    mediaURL: string;
}

interface IReviewContext {
    review: IReview | null;
    setReview: Dispatch<SetStateAction<IReview | null>>;
    reviewId: string;
    reviewResult: IReviewResult[];
    setReviewResult: Dispatch<SetStateAction<IReviewResult[]>>;
    currentSlide: number;
    setCurrentSlide: Dispatch<SetStateAction<number>>;
    loaded: boolean;
    setLoaded: Dispatch<SetStateAction<boolean>>;
    sliderRef: any;
    instanceRef: any;
    files: IUploadedMediaObject[];
    setFiles: Dispatch<SetStateAction<IUploadedMediaObject[]>>;
    comment: string;
    setComment: Dispatch<SetStateAction<string>>;
    handleSubmitReview: () => void;
    merchantId: string | undefined;
    finalSubmissionSuccessful: boolean | undefined;
    setFinalSubmissionSuccessful: Dispatch<SetStateAction<boolean | undefined>>;
    handleMediaFileDelete: (file: IUploadedMediaObject) => void;
}

const ReviewContext = createContext<IReviewContext | null>(null);

export const ReviewProvider: FC<{ children: ReactNode }> = ({ children }) => {
    const { id } = useParams();
    const [review, setReview] = useState<IReview | null>(null);
    const [reviewResult, setReviewResult] = useState<IReviewResult[]>([]);
    const [reviewId, setReviewId] = useState<string>('');
    const [currentSlide, setCurrentSlide] = useState<number>(0);
    const [loaded, setLoaded] = useState<boolean>(false);
    const [files, setFiles] = useState<IUploadedMediaObject[]>([]);
    const [comment, setComment] = useState<string>('');
    const [finalSubmissionSuccessful, setFinalSubmissionSuccessful] = useState<boolean | undefined>(undefined);

    const { data: reviewData, isError } = useGetReviewQuery(reviewId);
    const [updateReview] = useUpdateReviewMutation();

    const slideChanged = (slider: KeenSliderInstance) => {
        setCurrentSlide(slider.track.details.rel);
    };

    const [sliderRef, instanceRef] = useKeenSlider({
        initial: 0,
        slides: { number: 3 },
        slideChanged,
        created: () => setLoaded(true),
    });

    // Set review ID from route
    useEffect(() => {
        if (id) setReviewId(id);
    }, [id]);

    // Load review and prefill media + comment
    useEffect(() => {
        if (reviewData) {
            const mediaResults: IUploadedMediaObject[] = reviewData.result
                ?.filter((res: any) => res.mediaURL)
                .map((res: any) => res); // Consider normalizing this

            const commentResult = reviewData.result?.find((res: any) => typeof res.comment === 'string');

            setFiles(mediaResults || []);
            setComment(commentResult?.comment || '');
            setReview(reviewData);
        }
    }, [reviewData]);

    // Error state
    if (isError) return <ErrorComponent message="Nothing to see here!" />;

    const handleMediaFileDelete = async (file: IUploadedMediaObject) => {
        if (review?.status === 'Completed') return;

        const imageName = file.mediaURL.split('/').pop();
        if (!imageName) return;

        await deleteImageFromS3(`${review?.merchantId}/${imageName}`);
        setFiles((prev) => prev.filter((f) => f.id !== file.id));
    };

    const handleSubmitReview = async () => {
        if (!review) return;

        const finalReview: IReview = {
            ...review,
            result: [...reviewResult, ...files, { comment }],
            status: 'Completed',
        };

        try {
            await updateReview(finalReview as any); // optional: normalize before sending
            setFinalSubmissionSuccessful(true);
        } catch (e) {
            console.error('Error updating review:', e);
            setFinalSubmissionSuccessful(false);
        }
    };

    return (
        <ReviewContext.Provider
            value={{
                review,
                setReview,
                reviewId,
                reviewResult,
                setReviewResult,
                currentSlide,
                setCurrentSlide,
                loaded,
                setLoaded,
                sliderRef,
                instanceRef,
                files,
                setFiles,
                comment,
                setComment,
                handleSubmitReview,
                merchantId: review?.merchantId,
                finalSubmissionSuccessful,
                setFinalSubmissionSuccessful,
                handleMediaFileDelete,
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
