import express, { Request, Response } from 'express';
import path from 'path';
import logger from 'morgan';

import indexRouter from './routes/index';

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/', indexRouter);

app.get('/', (req: Request, res: Response): void => {
    res.status(200).json({ message: 'success' });
});

app.listen(5000, () => {
    console.log('server start');
});

module.exports = app;
