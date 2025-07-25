import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { IconPlus } from '@tabler/icons-react';

import { useReview } from '../../contexts/ReviewContext.tsx';
import { IUploadedMediaObject, UploadResult } from '../../types/review.ts';
import { useUploadReviewMediaMutation } from '../../redux/nudgenest.ts';
import PreviewComponent from './MediaPreviewComponent.tsx';

const MediaWidget = () => {
    const { merchantId, reviewFormHoook, review, reviewId, reviewStatus } = useReview();
    const [uploadReviewMedia] = useUploadReviewMediaMutation();

    const onDrop = useCallback(
        async (acceptedFiles: File[]) => {
            if (reviewId === 'demo') {
                reviewFormHoook.addMedia([
                    {
                        id: 'demo',
                        mediaURL: 'https://nudge-nest-media.s3.eu-north-1.amazonaws.com/2/1752851327463_da08ab6e_0.jpg',
                    },
                ]);
            } else {
                const formdata = new FormData();
                formdata.append('reviewId', reviewId);
                formdata.append('merchantId', merchantId);
                acceptedFiles.map((file: File) => {
                    return formdata.append('files', file);
                });
                const uploadResult = (await uploadReviewMedia(formdata).unwrap()) as UploadResult;
                const reformedUploadResult = uploadResult.map((result) => {
                    return { id: result.id, mediaURL: result.url };
                });
                reviewFormHoook.addMedia(reformedUploadResult);
            }
        },
        [reviewFormHoook, reviewId, merchantId, uploadReviewMedia]
    );
    const { getRootProps, getInputProps } = useDropzone({ onDrop });

    return (
        <div className={`w-full h-fit h-min-25 text-[color:var(--color-text)]`}>
            <div className={`w-full mb-8 text-center text-[color:var(--color-text)]`}>
                <h3 className={`font-bold text-xl`}>Brag a little</h3>
                <p className={`font-normal text-base`}>Snap it, share it, show it off!</p>
            </div>
            <div
                className={`w-full h-fit grid grid-cols-5 gap-1.5 p-2 border-1 border-[color:var(--color-text)] rounded-lg`}
            >
                {reviewFormHoook.media.map((media: IUploadedMediaObject, idx: number) => (
                    <PreviewComponent
                        media={media}
                        key={idx}
                        onDelete={reviewStatus === 'Completed' ? undefined : () => reviewFormHoook.removeMedia(media)}
                    />
                ))}
                {review?.status === 'Completed' ? (
                    <></>
                ) : (
                    <div
                        {...getRootProps()}
                        className={`h-20 max-w-20 w-20 border-2 border-[color:var(--color-text)] rounded-lg flex items-center justify-center cursor-pointer`}
                    >
                        <input {...getInputProps()} />
                        <IconPlus className={``} />
                    </div>
                )}
            </div>
        </div>
    );
};

export default MediaWidget;
