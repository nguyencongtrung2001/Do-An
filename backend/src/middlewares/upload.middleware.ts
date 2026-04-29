import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import cloudinary from '../config/cloudinary.config.js';

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'bookingsport/cccd',
    allowed_formats: ['jpg', 'jpeg', 'png', 'webp'],
  } as any,
});

export const uploadCCCD = multer({ storage }).fields([
  { name: 'anh_cccd_truoc', maxCount: 1 },
  { name: 'anh_cccd_sau', maxCount: 1 }
]);

export const uploadCourt = multer({ storage }).array('images', 5);
