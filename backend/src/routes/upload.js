import express from 'express';
import multer from 'multer';
import { v4 as uuidv4 } from 'uuid';
import minioClient from '../minio.js';

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

router.post('/upload', upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const fileName = `${uuidv4()}-${req.file.originalname}`;
    const bucketName = process.env.MINIO_BUCKET || 'podcast-storage';

    await minioClient.putObject(
      bucketName,
      fileName,
      req.file.buffer,
      req.file.size,
      { 'Content-Type': req.file.mimetype }
    );

    const fileUrl = `${process.env.MINIO_ENDPOINT || 'http://localhost:9000'}/${bucketName}/${fileName}`;

    res.json({
      fileName,
      fileUrl,
      size: req.file.size,
      mimetype: req.file.mimetype
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
