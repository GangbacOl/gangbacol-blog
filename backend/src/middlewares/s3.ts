import AWS from 'aws-sdk';
import multer from 'multer';
import multerS3 from 'multer-S3';
import path from 'path';

AWS.config.loadFromPath(path.join(__dirname, '../config/config.json'));

const s3 = new AWS.S3();

const param = {
    Bucket: 'gangbacol-blog-storage',
};

const uploadImages = multer({
    storage: multerS3({
        s3: s3,
        bucket: param.Bucket, // 버킷 이름
        key: (req, file, cb) => {
            console.log('file: ' + file.originalname);
            cb(null, 'images/' + Date.now() + '.' + file.originalname);
        },
        acl: 'public-read-write',
    }),
    limits: { fileSize: 3 * 1024 * 1024 }, // 용량 제한
});

const uploadMarkdown = multer({
    storage: multerS3({
        s3: s3,
        bucket: param.Bucket, // 버킷 이름
        key: (req, file, cb) => {
            console.log('file: ' + file.originalname);
            cb(null, 'markdowns/' + Date.now() + '.' + file.originalname);
        },
        acl: 'public-read-write',
    }),
    limits: { fileSize: 3 * 1024 * 1024 }, // 용량 제한
});

function getObjectList() {
    return new Promise(
        async (resolve) =>
            await s3.listObjects(param, (err, res) => {
                let lists = [];
                if (err) throw err;
                const contents = res.Contents;
                contents.map((content) => {
                    console.log(content);
                    const item = {
                        title: content.Key,
                        date: content.LastModified,
                    };
                    lists.push(item);
                });
                resolve(lists);
            })
    );
}

function deleteObject(filename: string) {
    return new Promise(
        async (resolve) =>
            await s3.deleteObject({ Bucket: param.Bucket, Key: filename }, (data) => {
                try {
                    console.log(data);
                    resolve(data);
                } catch (err) {
                    console.log(err);
                }
            })
    );
}

export { uploadImages, uploadMarkdown, getObjectList, deleteObject };
