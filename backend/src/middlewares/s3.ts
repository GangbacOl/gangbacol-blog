import AWS from 'aws-sdk';
import multer from 'multer';
import multerS3 from 'multer-S3';
import path from 'path';

AWS.config.loadFromPath(path.join(__dirname, '../config/config.json'));

const s3 = new AWS.S3();

const params = {
    Bucket: 'gangbacol-blog-storage',
    Delimiter: '/',
    Prefix: 'markdowns/',
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

const getObjectList = () => {
    return new Promise(
        async (resolve) =>
            await s3.listObjectsV2(params, (err, res) => {
                let lists = [];
                if (err) throw err;
                const contents = res.Contents.slice(1);
                contents.map((content) => {
                    console.log(content);
                    const item = {
                        filename: content.Key.split('/')[1],
                        date: content.LastModified,
                    };
                    lists.push(item);
                });
                resolve(lists);
            })
    );
};

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

export { uploadImages, getObjectList, deleteObject };
