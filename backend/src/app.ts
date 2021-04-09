import express, { Request, Response } from 'express';
import logger from 'morgan';

import listRouter from './routes/list';
import uploadRouter from './routes/upload';
import deleteRouter from './routes/delete';

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/list', listRouter);
app.use('/upload', uploadRouter);
app.use('/delete', deleteRouter);

app.get('/', (req: Request, res: Response): void => {
    res.status(200).json({ message: 'success' });
});

app.listen(5000, () => {
    console.log('server start');
});
