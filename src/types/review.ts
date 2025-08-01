export interface IReview {
    id?: string;
    merchantId: string;
    items: IReviewItem[];
    result?: IReviewResult[];
    status: 'Pending' | 'Completed' | 'Failed';
    createdAt: string;
    updatedAt: string;
}

export interface IReviewItem {
    id: string;
    name: string;
    image?: string;
    [key: string]: any;
}

export interface IReviewResult {
    id?: string;
    value?: number;
    media?: IUploadedMediaObject[];
    comment?: string;
}

export interface IUploadedMediaObject {
    id: string;
    mediaURL: string;
}

export type UploadResult = Array<{
    id: string;
    url: string;
    filename: string;
    size: number;
    type: string;
}>;
