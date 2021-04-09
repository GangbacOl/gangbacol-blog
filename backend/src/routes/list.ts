import express, { Request, Response } from 'express';
import { getObjectList } from '../middlewares/s3';

const router = express.Router();

router.get('/', async (req: Request, res: Response) => {
    try {
        const objectList = await getObjectList();
        res.status(200).json({ posts: objectList });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: '서버 에러' });
    }
});

export default router;
