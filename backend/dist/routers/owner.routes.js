import { Router } from 'express';
import { uploadOwnerFiles, uploadCourt } from '../middlewares/upload.middleware.js';
import { authenticate } from '../middlewares/auth.middleware.js';
import { registerOwner, getMyCourts, addCourt, updateCourt, getMyBookings, updateBookingStatus, getPendingCount } from '../controllers/owner.controller.js';
const router = Router();
router.post('/register', uploadOwnerFiles, registerOwner);
router.get('/my-courts', authenticate, getMyCourts);
router.post('/add-court', authenticate, uploadCourt, addCourt);
router.put('/update-court/:ma_san', authenticate, uploadCourt, updateCourt);
router.get('/my-bookings', authenticate, getMyBookings);
router.patch('/update-booking-status/:id', authenticate, updateBookingStatus);
router.get('/pending-count', authenticate, getPendingCount);
export default router;
//# sourceMappingURL=owner.routes.js.map