import express, { Request, Response } from 'express';
import logger from 'morgan';
import cors from 'cors';

import s3Router from './routes/s3';
import authRouter from './routes/auth';

import sync from './models/index';

const app = express();

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/', s3Router);
app.use('/admin', authRouter);

app.get('/', (req: Request, res: Response): void => {
    res.status(200).json({ message: 'success' });
});

// sync sequelize orm into database
sync();

app.listen(5000, () => {
    console.log('server start');
});
