import { Request, Response } from 'express';

import { deleteObject } from '../../middlewares/s3';
import MulterRequest from '../../../interface/MulterRequest.interface';

import { postsRepository } from '../../models/index';

const getOneItemCtrl = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        const result = await postsRepository.findOne({ where: { id } });
        res.status(200).json({ success: true, post: result });
    } catch (err) {
        console.log(err);
        res.status(500).json({ success: false, msg: 'server error' });
    }
};

const getItemsCtrl = async (req: Request, res: Response) => {
    try {
        const result = await postsRepository.findAll({ raw: true });
        console.log(result);
        res.status(200).json({ success: true, posts: result });
    } catch (err) {
        console.log(err);
        res.status(500).json({ success: false, msg: 'server error' });
    }
};

const uploadImagesCtrl = async (req: MulterRequest, res: Response) => {
    try {
        const filenames = (req.files as any[]).map((file) => file.key);

        const fileLocations = (req.files as any[]).map((file) => file.location);
        res.status(200).json({ success: true, filenames, fileLocations });
    } catch (err) {
        console.log(err);
        res.status(500).json({ success: false, msg: 'server error' });
    }
};

const uploadMarkdownCtrl = async (req: Request, res: Response) => {
    try {
        const { title, content, filenames } = req.body;
        console.log(filenames);
        const result = await postsRepository.create({ title, content, imageUrls: JSON.stringify(filenames) });

        res.status(200).json({ success: true, msg: 'success' });
    } catch (err) {
        console.log(err);
        res.status(500).json({ success: false, msg: 'server error' });
    }
};

const deleteItemCtrl = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        const result = await postsRepository.findAll({ where: { id }, raw: true });
        const filenames = JSON.parse(result[0].imageUrls);

        if (filenames.length > 0) await deleteObject(filenames);
        await postsRepository.destroy({ where: { id } });

        res.status(200).json({ success: true, msg: result });
    } catch (err) {
        console.log(err);
        res.status(500).json({ success: false, msg: 'server error' });
    }
};

export default { getOneItemCtrl, getItemsCtrl, uploadImagesCtrl, uploadMarkdownCtrl, deleteItemCtrl };
