import AWS from 'aws-sdk';
import multer from 'multer';
import multerS3 from 'multer-S3';
import path from 'path';

AWS.config.loadFromPath(path.join(__dirname, '../config/config.json'));

const s3 = new AWS.S3();

const params = {
    Bucket: 'gangbacol-blog-storage',
    Delimiter: '/',
};

const uploadImages = multer({
    storage: multerS3({
        s3: s3,
        bucket: params.Bucket, // 버킷 이름
        key: (req, file, cb) => {
            console.log('file: ' + file.originalname);
            cb(null, 'images/' + Date.now() + '.' + file.originalname);
        },
        acl: 'public-read-write',
    }),
    limits: { fileSize: 3 * 1024 * 1024 }, // 용량 제한
});

const deleteObject = (filename: string) => {
    return new Promise(
        async (resolve) =>
            await s3.deleteObject({ Bucket: params.Bucket, Key: filename }, (data) => {
                try {
                    console.log(data);
                    resolve(data);
                } catch (err) {
                    console.log(err);
                }
            })
    );
};

export { uploadImages, deleteObject };
