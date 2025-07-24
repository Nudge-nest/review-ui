import { FC } from 'react';
import { IUploadedMediaObject } from '../../types/review.ts';
import { IconXboxXFilled } from '@tabler/icons-react';

const PreviewComponent: FC<{ media: IUploadedMediaObject; onDelete?: () => void }> = ({ media, onDelete }) => {
    if (!media) return null;

    const isVideo = (url: string): boolean => {
        const videoExtensions = ['.mp4', '.mov', '.webm', '.ogg', '.avi', '.mkv'];
        return videoExtensions.some((ext) => url.toLowerCase().includes(ext));
    };

    return (
        <div className="relative w-20 h-20 rounded-lg overflow-hidden">
            {onDelete ? <button
                onClick={onDelete}
                className="absolute top-0 right-0 z-1000 bg-[color:var(--color-main)] rounded-full cursor-pointer"
                aria-label="Remove media"
            >
                <IconXboxXFilled size={20} fill="#fff"/>
            </button> : <></>}
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

export default PreviewComponent;
