import express, { Request, Response } from 'express';

var router = express.Router();

router.get('/', async (req: Request, res: Response) => {
    res.json({ message: 'success' });
});

export default router;
