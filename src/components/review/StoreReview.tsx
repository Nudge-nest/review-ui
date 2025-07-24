import { useEffect, useState } from 'react';

import { IReviewItem, IReviewResult, useReview } from '../../contexts/ReviewContext.tsx';
import RatingWidget from './RatingWidget.tsx';
import MediaWidget from './MediaWidget.tsx';
import CommentWidget from './CommentWidget.tsx';
import Loading from '../Loading.tsx';

const StoreReview = () => {
    const { review, sliderRef, loaded, instanceRef, currentSlide, isFetching } = useReview();
    const [items, setItems] = useState<IReviewItem[]>([]);
    const [result, setResult] = useState<IReviewResult[] | undefined>(undefined);
    useEffect(() => {
        if (review) {
            setItems(review.items);
            if (review.result) setResult(review.result);
        }
    }, [review]);
    if (isFetching) return <Loading />;
    return (
        <div className={`h-full px-4 text-center grid grid-rows-[95%_auto]`}>
            <div ref={sliderRef} className="h-full scroll-auto keen-slider">
                <div
                    className={`h-full flex flex-col gap-2 ${items.length <= 1 ? 'justify-center' : 'justify-start'} pt-4 keen-slider__slide overflow-auto`}
                >
                    {items.map((item: IReviewItem, i: number) => {
                        return (
                            <RatingWidget
                                product={item}
                                key={i}
                                result={result}
                                isCompleted={result && result.length > 0}
                            />
                        );
                    })}
                </div>
                <div className="h-full flex flex-col gap-2 justify-center keen-slider__slide">
                    <MediaWidget />
                </div>
                <div className="h-full flex flex-col gap-2 justify-center keen-slider__slide">
                    <CommentWidget />
                </div>
            </div>
            {loaded && instanceRef.current && (
                <div className="w-full dots flex justify-center-safe gap-4 py-2">
                    {[...Array(instanceRef.current.track.details.slides.length).keys()].map((idx) => {
                        return (
                            <button
                                key={idx}
                                onClick={() => {
                                    instanceRef.current?.moveToIdx(idx);
                                }}
                                className={`dot w-20 h-1.5 rounded ${idx <= currentSlide ? 'active bg-[color:var(--color-main)]' : 'bg-[color:var(--color-disabled)]'}`}
                            ></button>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

export default StoreReview;
