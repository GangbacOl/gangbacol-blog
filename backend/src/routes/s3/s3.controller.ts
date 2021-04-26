import { Request, Response } from 'express';

import { deleteObject, getObjectList } from '../../middlewares/s3';
import MulterRequest from '../../../interface/MulterRequest.interface';

import { postsRepository } from '../../models/index';

const getItemCtrl = async (req: Request, res: Response) => {
    try {
        const objectList = await getObjectList();
        const result = await postsRepository.findAll({ raw: true });
        (result as any[]).map((item, idx) => {
            objectList[idx].title = item.title;
        });
        res.status(200).json({ posts: objectList });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: '서버 에러' });
    }
};

const uploadImagesCtrl = async (req: MulterRequest, res: Response) => {
    try {
        const filesLocation = (req.files as any[]).map((file) => file.location);
        res.json({ filesLocation });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: '서버 에러' });
    }
};

const uploadMarkdownCtrl = async (req: MulterRequest, res: Response) => {
    try {
        const title = req.body.title;
        const result = await postsRepository.create({ title, markdownUrls: req.file.location });
        res.status(200).json({ message: req.file.location });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: '서버 에러' });
    }
};

const deleteItemCtrl = async (req: Request, res: Response) => {
    try {
        const filename = req.params.id;
        const result = await deleteObject(filename);
        res.status(200).json({ message: result });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: '서버 에러' });
    }
};

export default { getItemCtrl, uploadImagesCtrl, uploadMarkdownCtrl, deleteItemCtrl };
