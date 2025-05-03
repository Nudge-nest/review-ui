import { useReview } from '../../contexts/ReviewContext.tsx';
import { ChangeEvent } from 'react';
import ThankYouComponent from '../ThankYouComponent.tsx';
import ErrorComponent from '../ErrorComponent.tsx';

const CommentWidget = () => {
    const { comment, setComment, handleSubmitReview, finalSubmissionSuccessful, review } = useReview();

    if (finalSubmissionSuccessful === true) return <ThankYouComponent />;
    if (finalSubmissionSuccessful === false) return <ErrorComponent />;
    if (finalSubmissionSuccessful === undefined) {
        return (
            <div className="text-center text-[color:var(--color-text)]">
                <div className={`w-full mb-8 text-center text-[color:var(--color-text)]`}>
                    <h3 className={`text-[color:var(--color-text)] font-bold text-xl`}>Tell us more!</h3>
                    <p className={`text-[color:var(--color-text)] font-normal text-base`}></p>
                </div>
                <textarea
                    className="border-1 rounded w-full mb-8 p-2 text-[color:var(--color-text)]"
                    rows={5}
                    placeholder="Share your experience"
                    value={comment}
                    onChange={(event: ChangeEvent<HTMLTextAreaElement>) => setComment(() => event.target.value)}
                />
                <div className={`w-full mb-8 text-center text-[color:var(--color-text)]`}>
                    <p className={`text-[color:var(--color-text)] font-normal text-sm text-balance`}>
                        By submitting, I acknowledge the Terms of Service and Privacy Policy and that my review will be
                        publicly posted and shared online.
                    </p>
                </div>
                <button
                    className={`w-full h-12 ${review?.status === 'Completed' ? 'bg-[color:var(--color-disabled)]' : 'bg-[color:var(--color-main)]'} rounded-lg cursor-pointer`}
                    onClick={handleSubmitReview}
                    disabled={review?.status === 'Completed' || comment.length === 0}
                >
                    <p className="text-[color:var(--color-text)] text-lg font-semibold">Submit</p>
                </button>
            </div>
        );
    }
};

export default CommentWidget;
