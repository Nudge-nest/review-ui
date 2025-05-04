import { FC, useCallback, useEffect, useState } from 'react';
import { IReviewItem, IReviewResult, useReview } from '../../contexts/ReviewContext.tsx';
import RatingStar from './Star.tsx';

interface RatingWidgetProps {
    product: IReviewItem;
    result?: IReviewResult[];
    isCompleted?: boolean;
}

const MAX_RATING = 5;
const RATING_ARRAY = Array.from({ length: MAX_RATING });

const RatingWidget: FC<RatingWidgetProps> = ({ product, result, isCompleted }) => {
    const [selectedRating, setSelectedRating] = useState<number>(0);
    const { name, image, id } = product;
    const { setReviewResult } = useReview();

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
            setReviewResult((prevState) => {
                const index = prevState.findIndex((result) => result.id === id);

                if (index !== -1) {
                    const updated = [...prevState];
                    updated[index] = { id, value: ratingValue };
                    return updated;
                }

                return [...prevState, { id, value: ratingValue }];
            });
        },
        [id, setReviewResult, isCompleted]
    );

    return (
        <div className={`pt-12`}>
            <div className={`w-full text-center`}>
                <img src={image || 'https://picsum.photos/200/300'} className="h-15 w-15 rounded mb-4 block mx-auto" alt={`${name}-image`}/>
                <p className={`text-base text-balance`}>
                    {`Your rating for `}
                    <b>{` ${name || ''}`}</b>?
                </p>
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
