import express from 'express';

import { uploadImages } from '../../middlewares/s3';
import controller from '../s3/s3.controller';

const router = express.Router();

router.get('/list', controller.getItemCtrl);
router.post('/uploadImages', uploadImages.array('images'), controller.uploadImagesCtrl);
router.post('/uploadMarkdown', controller.uploadMarkdownCtrl);
router.delete('/delete/:id', controller.deleteItemCtrl);

export default router;
