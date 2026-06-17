import { Router } from 'express';
import {
  getAllUsers,
  getUserById,
  toggleUserStatus,
  getPendingOwners,
  approveOwner,
  getAllLocations,
  getPendingLocations,
  approveLocation,
  rejectLocation,
  deleteUser,
} from '../controllers/admin.controller.js';

const router = Router();


router.get('/users', getAllUsers);
router.get('/users/:id', getUserById);
router.put('/users/:id/toggle-status', toggleUserStatus);
router.delete('/users/:id', deleteUser);


router.get('/owners/pending', getPendingOwners);
router.put('/owners/:id/approve', approveOwner);


router.get('/locations', getAllLocations);
router.get('/locations/pending', getPendingLocations);
router.put('/locations/:id/approve', approveLocation);
router.put('/locations/:id/reject', rejectLocation);

export default router;