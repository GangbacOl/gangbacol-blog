import express, { Request, Response } from 'express';
import { getObjectList } from '../middlewares/s3';

const router = express.Router();

router.get('/', async (req: Request, res: Response) => {
    const objectList = await getObjectList();
    res.status(200).json({ posts: objectList });
});

export default router;
