import express from 'express';

import { uploadImages } from '../../middlewares/s3';
import controller from './s3.controller';
import { verifyToken } from '../../middlewares/auth';

const router = express.Router();

router.use('/uploadImages', verifyToken);
router.use('/uploadMarkdown', verifyToken);
router.use('/delete/:id', verifyToken);

router.get('/item/:id', controller.getOneItemCtrl);
router.get('/list', controller.getItemsCtrl);
router.post('/uploadImages', uploadImages.array('images'), controller.uploadImagesCtrl);
router.post('/uploadMarkdown', controller.uploadMarkdownCtrl);
router.delete('/delete/:id', controller.deleteItemCtrl);

export default router;
