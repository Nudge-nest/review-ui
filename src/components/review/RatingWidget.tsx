import { FC, useCallback, useEffect, useState } from 'react';
import RatingStar from './Star.tsx';
import { useReview } from '../../contexts/ReviewContext.tsx';
import { IReviewItem, IReviewResult } from '../../types/review.ts';

interface RatingWidgetProps {
    product: IReviewItem;
    result?: IReviewResult[];
    isCompleted?: boolean;
}

const MAX_RATING = 5;
const RATING_ARRAY = Array.from({ length: MAX_RATING });

const RatingWithProduct: FC<{ itemName: string; image?: string }> = ({ itemName, image }) => {
    return (
        <>
            <img
                src={image || 'https://placehold.co/300x300'}
                className="h-15 w-15 rounded mb-4 block mx-auto"
                alt={`${itemName}-image`}
            />
            <p className={`text-base text-balance`}>
                {`Your rating for `}
                <b>{` ${itemName || ''}`}</b>?
            </p>
        </>
    );
};

const RatingWidget: FC<RatingWidgetProps> = ({ product, result, isCompleted }) => {
    const [selectedRating, setSelectedRating] = useState<number>(0);
    const { name, image, id } = product;
    const { reviewFormHoook } = useReview();

    useEffect(() => {
        if (isCompleted && result) {
            const itemReview = result.find((res) => res.id === id);
            if (itemReview) {
                setSelectedRating(Number(itemReview.value));
            }
        }
    }, [result, id, isCompleted]);

    const _handleSetRating = useCallback(
        (ratingValue: number) => {
            if (isCompleted) return;
            setSelectedRating(() => ratingValue);
            reviewFormHoook.updateRating({ id: id, value: ratingValue });
        },
        [id, reviewFormHoook, isCompleted]
    );

    return (
        <div className={`pt-12`}>
            <div className={`w-full text-center`}>
                {image ? (
                    <RatingWithProduct itemName={name} image={image} />
                ) : (
                    <p className={`text-base text-balance`}>
                        <b>{`${name || ''}`}</b>
                    </p>
                )}
            </div>
            <div className="w-full p-2 flex justify-center gap-4">
                {RATING_ARRAY.map((_, idx) => {
                    const ratingValue: number = idx + 1;
                    return (
                        <RatingStar
                            key={idx}
                            fill="#fcc800"
                            defaultFill="#f9f9f9"
                            isFilled={ratingValue <= selectedRating}
                            onClick={() => _handleSetRating(ratingValue)}
                        />
                    );
                })}
            </div>
        </div>
    );
};

export default RatingWidget;
