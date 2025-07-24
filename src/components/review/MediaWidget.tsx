import { FC, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { IconPlus, IconXboxXFilled } from '@tabler/icons-react';

import { useReview } from '../../contexts/ReviewContext.tsx';
import { IUploadedMediaObject, UploadResult } from '../../types/review.ts';
import { useUploadReviewMediaMutation } from '../../redux/nudgenest.ts';

const PreviewComponent: FC<{ media: IUploadedMediaObject; onDelete: () => void }> = ({ media, onDelete }) => {
    if (!media) return null;

    const isVideo = (url: string): boolean => {
        const videoExtensions = ['.mp4', '.mov', '.webm', '.ogg', '.avi', '.mkv'];
        return videoExtensions.some((ext) => url.toLowerCase().includes(ext));
    };

    return (
        <div className="relative w-20 h-20 rounded-lg overflow-hidden">
            <button
                onClick={onDelete}
                className="absolute top-0 right-0 z-1000 bg-[color:var(--color-main)] rounded-full cursor-pointer"
                aria-label="Remove media"
            >
                <IconXboxXFilled size={20} fill="#fff" />
            </button>
            {isVideo(media.mediaURL) ? (
                <video src={media.mediaURL} className="w-full h-full object-cover" controls={false} />
            ) : (
                <img
                    src={media.mediaURL}
                    className="w-full h-full object-cover"
                    onLoad={() => {
                        URL.revokeObjectURL(media.mediaURL);
                    }}
                    alt={`Media preview ${media.id}`}
                />
            )}
        </div>
    );
};

const MediaWidget = () => {
    const { merchantId, reviewFormHoook, review, reviewId } = useReview();
    const [uploadReviewMedia] = useUploadReviewMediaMutation();

    const onDrop = useCallback(
        async (acceptedFiles: File[]) => {
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
                    <PreviewComponent media={media} key={idx} onDelete={() => reviewFormHoook.removeMedia(media)} />
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
