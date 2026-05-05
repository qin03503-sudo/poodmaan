import { Client } from 'minio';

const minioClient = new Client({
  endPoint: process.env.MINIO_ENDPOINT || 'localhost',
  port: parseInt(process.env.MINIO_PORT || '9000'),
  useSSL: process.env.MINIO_USE_SSL === 'true',
  accessKey: process.env.MINIO_ACCESS_KEY || 'minioadmin',
  secretKey: process.env.MINIO_SECRET_KEY || 'minioadmin',
});

export async function initMinIO() {
  try {
    const bucketName = process.env.MINIO_BUCKET || 'podcast-storage';
    const exists = await minioClient.bucketExists(bucketName);
    
    if (!exists) {
      await minioClient.makeBucket(bucketName, 'us-east-1');
      console.log(`MinIO bucket "${bucketName}" created successfully`);
    } else {
      console.log(`MinIO bucket "${bucketName}" already exists`);
    }
  } catch (err) {
    console.error('MinIO initialization error:', err);
    throw err;
  }
}

export default minioClient;
