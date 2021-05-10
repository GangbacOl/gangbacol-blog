import { Request, Response } from 'express';

import { deleteObject } from '../../middlewares/s3';
import MulterRequest from '../../../interface/MulterRequest.interface';

import { postsRepository } from '../../models/index';

const getOneItemCtrl = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        const result = await postsRepository.findOne({ where: { id } });
        res.status(200).json({ post: result });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: '서버 에러' });
    }
};

const getItemCtrl = async (req: Request, res: Response) => {
    try {
        const result = await postsRepository.findAll({ raw: true });
        console.log(result);
        res.status(200).json({ posts: result });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: '서버 에러' });
    }
};

const uploadImagesCtrl = async (req: MulterRequest, res: Response) => {
    try {
        console.log(req.files);
        const filesLocation = (req.files as any[]).map((file) => file.location);
        res.status(200).json({ filesLocation });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: '서버 에러' });
    }
};

const uploadMarkdownCtrl = async (req: Request, res: Response) => {
    try {
        const { title, content } = req.body;
        console.log(title);
        console.log(content);
        const result = await postsRepository.create({ title, content });
        res.status(200).json({ message: 'success' });
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

export default { getOneItemCtrl, getItemCtrl, uploadImagesCtrl, uploadMarkdownCtrl, deleteItemCtrl };
