import { Request, Response } from 'express';
import multer from 'multer';
import fs from 'fs';
import path from 'path';
import prisma from '../prisma';

// Ensure uploads folder exists
const uploadDir = path.join(process.cwd(), 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Configure Multer
const storage = multer.diskStorage({
  destination: (req: any, file: any, cb: any) => {
    cb(null, uploadDir);
  },
  filename: (req: any, file: any, cb: any) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, `${uniqueSuffix}-${file.originalname}`);
  }
});

export const upload = multer({ storage });

export const uploadAttachment = async (req: Request, res: Response) => {
  try {
    const multerReq = req as any;
    if (!multerReq.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const { entityType, entityId, uploaderId } = req.body;

    const attachment = await prisma.attachment.create({
      data: {
        filename: multerReq.file.originalname,
        fileUrl: `/uploads/${multerReq.file.filename}`,
        fileSize: multerReq.file.size,
        contentType: multerReq.file.mimetype,
        entityType,
        entityId,
        uploaderId
      }
    });

    res.status(201).json({ message: 'File uploaded successfully', attachment });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to upload file' });
  }
};

export const getAttachments = async (req: Request, res: Response) => {
  try {
    const { entityType, entityId } = req.query;
    
    if (!entityType || !entityId) {
       return res.status(400).json({ error: 'Missing entityType or entityId' });
    }

    const attachments = await prisma.attachment.findMany({
      where: {
        entityType: String(entityType),
        entityId: String(entityId)
      }
    });

    res.json(attachments);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch attachments' });
  }
}
