import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import cloudinary from '../config/cloudinary.config.js';
const cccdStorage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'bookingsport/cccd',
        allowed_formats: ['jpg', 'jpeg', 'png', 'webp'],
    },
});
const avatarStorage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'bookingsport/avatars',
        allowed_formats: ['jpg', 'jpeg', 'png', 'webp'],
    },
});
const courtStorage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'bookingsport/courts',
        allowed_formats: ['jpg', 'jpeg', 'png', 'webp'],
    },
});
export const uploadCCCD = multer({ storage: cccdStorage }).fields([
    { name: 'anh_cccd_truoc', maxCount: 1 },
    { name: 'anh_cccd_sau', maxCount: 1 }
]);
export const uploadOwnerFiles = multer({
    storage: multer.diskStorage({}),
}).fields([
    { name: 'anh_dai_dien', maxCount: 1 },
    { name: 'anh_cccd_truoc', maxCount: 1 },
    { name: 'anh_cccd_sau', maxCount: 1 }
]);
export const uploadCourt = multer({ storage: courtStorage }).array('images', 5);
export const uploadAvatar = multer({
    storage: multer.diskStorage({}),
}).single('anh_dai_dien');
//# sourceMappingURL=upload.middleware.js.map