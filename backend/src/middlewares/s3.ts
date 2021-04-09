import AWS from 'aws-sdk';
import multer from 'multer';
import multerS3 from 'multer-S3';
import path from 'path';

AWS.config.loadFromPath(path.join(__dirname, '../config/config.json'));

const s3 = new AWS.S3();

const param = {
    Bucket: 'gangbacol-blog-storage',
};

const uploadObject = multer({
    storage: multerS3({
        s3: s3,
        bucket: 'gangbacol-blog-storage', // 버킷 이름
        key: (req, file, cb) => {
            console.log(file);
            cb(null, Date.now() + '.' + file.originalname);
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

export { uploadObject, getObjectList, deleteObject };
