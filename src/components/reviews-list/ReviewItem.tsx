import { FC } from 'react';
import { IReviewResult, IUploadedMediaObject, ReviewItemProps } from '../../types/review.ts';
import { calculateReviewRating, sanitizeReviewText } from '../../utils/reviewsListing.ts';
import { IconPhoto } from '@tabler/icons-react';
import StarRating from './StarRating.tsx';

const ReviewItem: FC<ReviewItemProps> = ({ review, onMediaClick }) => {
    const result = review.result || [];
    const numericalResults = result.filter(
        (res): res is IReviewResult & { value: number } => res.value !== undefined && res.value !== null
    );
    const nonNumericalResults = result.filter((res) => !res.value);
    const rating = calculateReviewRating(review);

    // Get comment from the last non-numerical result
    const comment = nonNumericalResults[nonNumericalResults.length - 1]?.comment || '';

    // Collect all media from all results
    const allMedia: IUploadedMediaObject[] = nonNumericalResults.filter((res) => res.mediaURL);

    const reviewDate = review.createdAt ? new Date(review.createdAt).toLocaleDateString() : '';

    console.log('Review media', allMedia, result, nonNumericalResults);

    return (
        <div className="border border-[color:var(--color-border)] hover:shadow-lg transition-all duration-200 transform hover:-translate-y-0.5 h-auto grid grid-rows-[75%_auto]">
            {allMedia.length > 0 ? (
                <div className="relative cursor-pointer overflow-hidden" onClick={() => onMediaClick(allMedia, 0)}>
                    {allMedia.length > 1 && (
                        <div className="absolute top-2.5 left-2.5 bg-[color:var(--color-bg)] bg-opacity-80 rounded-full px-2 py-1 flex items-center gap-1 text-sm font-semibold z-10">
                            <IconPhoto size={16} />+{allMedia.length}
                        </div>
                    )}
                    {allMedia[0].mediaURL?.includes('.mp4') || allMedia[0].mediaURL?.includes('video') ? (
                        <video className="w-full h-full object-cover">
                            <source src={allMedia[0].mediaURL} type="video/mp4" />
                        </video>
                    ) : (
                        <img
                            src={allMedia[0].mediaURL}
                            alt="Review media"
                            className="w-full h-full object-cover hover:scale-105 transition-transform duration-200"
                            loading="lazy"
                        />
                    )}
                </div>
            ) : null}

            <div className="p-4 flex flex-col h-fit">
                <p className="font-bold text-[color:var(--color-text)] mb-1">Verified Customer</p>
                <p className="text-sm text-[color:var(--color-text)] font-light mb-2">{reviewDate}</p>
                <div className="mb-3">
                    <StarRating rating={rating} />
                </div>
                {comment && (
                    <p className="text-sm text-[color:var(--color-text)] font-semibold line-clamp-3">
                        {sanitizeReviewText(comment)}
                    </p>
                )}
            </div>
        </div>
    );
};

export default ReviewItem;
