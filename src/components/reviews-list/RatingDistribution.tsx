import { FC } from 'react';
import { RatingDistributionProps } from '../../types/review.ts';
import { calculateReviewRating } from '../../utils/reviewsListing.ts';
import StarRating from './StarRating.tsx';

const RatingDistribution: FC<RatingDistributionProps> = ({ reviews }) => {
    const calculateRatingCounts = (): Record<number, number> => {
        const counts: Record<number, number> = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
        reviews.forEach((review) => {
            const rating = Math.round(calculateReviewRating(review));
            if (rating >= 1 && rating <= 5) {
                counts[rating]++;
            }
        });
        return counts;
    };

    const counts = calculateRatingCounts();
    const total = Object.values(counts).reduce((sum, count) => sum + count, 0);

    return (
        <div className="p-4">
            <h3 className="font-semibold mb-4">Ratings Distribution</h3>
            <div className="space-y-3">
                {[5, 4, 3, 2, 1].map((star) => {
                    const percentage = total > 0 ? (counts[star] / total) * 100 : 0;
                    return (
                        <div key={star} className="flex items-center gap-3">
                            <StarRating rating={star} size={20} />
                            <div className="flex-1 bg-[color:var(--color-light)] rounded-full h-2.5 overflow-hidden">
                                <div
                                    className="bg-[color:var(--color-yellow)] h-full transition-all duration-300"
                                    style={{ width: `${percentage}%` }}
                                />
                            </div>
                            <span className="text-sm text-[color:var(--color-text)] w-12 text-right">
                                ({counts[star]})
                            </span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default RatingDistribution;
