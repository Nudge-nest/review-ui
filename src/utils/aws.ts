import { S3Client, PutObjectCommand, DeleteObjectCommand } from '@aws-sdk/client-s3';

import { PutObjectRequest } from '@aws-sdk/client-s3/dist-types/models';

const readFileAsArrayBuffer = (file: File): Promise<ArrayBuffer> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (e) => resolve(e.target?.result as ArrayBuffer);
        reader.onerror = reject;
        reader.readAsArrayBuffer(file);
    });
};

const sanitizeFileName = (name: string) => name.toLowerCase().replace(/[^a-z0-9\\.\\-_]/gi, '_');

export const uploadImageToS3 = async (file: File, merchantId: string): Promise<string> => {
    const safeFileName = sanitizeFileName(file.name);
    const key = `${merchantId}/${safeFileName}`;

    const s3Client = new S3Client({
        region: import.meta.env.VITE_APP_AWS_REGION,
        credentials: {
            accessKeyId: import.meta.env.VITE_APP_AWS_ACCESS_KEY,
            secretAccessKey: import.meta.env.VITE_APP_AWS_SECRET_KEY,
        },
    });

    const uploadParams: PutObjectRequest = {
        Bucket: import.meta.env.VITE_APP_AWS_BUCKET_NAME,
        Key: key,
        Body: await readFileAsArrayBuffer(file),
        ContentType: file.type || 'application/octet-stream',
        ACL: 'public-read',
        Metadata: {
            originalName: file.name,
            lastModified: String(file.lastModified),
            size: String(file.size || 0),
        },
    };

    try {
        const upload = await s3Client.send(new PutObjectCommand(uploadParams)); //await s3Client.putObject(uploadParams).promise();
        console.log('UPLOAD', upload, key);
        return `https://${import.meta.env.VITE_APP_AWS_BUCKET_NAME}.s3.${import.meta.env.VITE_APP_AWS_REGION}.amazonaws.com/${key}`;
    } catch (error: any) {
        console.error(error);
        // Inform user about the error
        return `Error uploading file: ${error.message}`;
    }
};

export const deleteImageFromS3 = async (fileKey: string): Promise<boolean> => {
    const s3Client = new S3Client({
        region: import.meta.env.VITE_APP_AWS_REGION,
        credentials: {
            accessKeyId: import.meta.env.VITE_APP_AWS_ACCESS_KEY,
            secretAccessKey: import.meta.env.VITE_APP_AWS_SECRET_KEY,
        },
    });

    const deleteParams = {
        Bucket: import.meta.env.VITE_APP_AWS_BUCKET_NAME,
        Key: fileKey,
    };

    try {
        await s3Client.send(new DeleteObjectCommand(deleteParams));
        console.log(`✅ Deleted from S3: ${fileKey}`);
        return true;
    } catch (error: any) {
        console.error(`❌ Error deleting from S3: ${error.message}`);
        return false;
    }
};
