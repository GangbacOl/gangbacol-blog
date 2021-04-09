import express, { Request, Response } from 'express';

import { deleteObject } from '../middlewares/s3';

const router = express.Router();

router.delete('/:id', async (req: Request, res: Response) => {
    try {
        const filename = req.params.id;
        const result = await deleteObject(filename);
        res.status(200).json({ message: result });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: '서버 에러' });
    }
});

export default router;
