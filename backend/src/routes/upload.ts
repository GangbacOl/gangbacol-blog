import express, { Response } from 'express';

import { uploadObject } from '../middlewares/s3';
import MulterRequest from '../../interface/MulterRequest.interface';

const router = express.Router();

router.post('/', uploadObject.single('markdown'), async (req: MulterRequest, res: Response) => {
    try {
        console.log('req.file: ', req.file); // 테스트 => req.file.location에 이미지 링크(s3-server)가 담겨있음
        let payload = { url: req.file.location };
        res.status(200).json({ message: payload });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: '서버 에러' });
    }
});

export default router;
