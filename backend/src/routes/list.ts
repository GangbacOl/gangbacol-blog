import express, { Request, Response } from 'express';

const router = express.Router();

const s3 = require('../aws/s3');

router.get('/', async (req: Request, res: Response) => {
    const objectList = await s3.getObjectList();
    res.status(200).json({ posts: objectList });
});

export default router;
