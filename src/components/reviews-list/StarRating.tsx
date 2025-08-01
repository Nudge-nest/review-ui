import { IconStar, IconStarFilled } from '@tabler/icons-react';
import { FC } from 'react';
import { StarRatingProps } from '../../types/review.ts';

const StarRating: FC<StarRatingProps> = ({ rating, size = 16, showEmpty = true }) => {
    return (
        <div className="flex gap-0.5">
            {[1, 2, 3, 4, 5].map((star) => (
                <span key={star} className="text-[color:var(--color-yellow)]">
                    {star <= rating ? (
                        <IconStarFilled size={size} />
                    ) : showEmpty ? (
                        <IconStar size={size} className="text-[color:var(--color-text)]" />
                    ) : null}
                </span>
            ))}
        </div>
    );
};

export default StarRating;
