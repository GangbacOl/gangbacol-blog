import AWS from 'aws-sdk';

AWS.config.region = 'ap-northeast-2';

const s3 = new AWS.S3();

const param = {
    Bucket: 'gangbacol-blog-storage',
};

async function getObjectList() {
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

export { getObjectList };
