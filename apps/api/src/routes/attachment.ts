import { Router } from 'express';
import { upload, uploadAttachment, getAttachments } from '../controllers/attachment';

const router = Router();

// Endpoint for uploading execution evidence and getting attachments
router.post('/upload', upload.single('file'), uploadAttachment);
router.get('/', getAttachments);

export default router;
