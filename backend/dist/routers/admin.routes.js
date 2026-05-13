import { Router } from 'express';
import { getAllUsers, getUserById, toggleUserStatus, getPendingOwners, approveOwner, getAllLocations, getPendingLocations, approveLocation, rejectLocation, deleteUser, } from '../controllers/admin.controller.js';
const router = Router();
// Users
router.get('/users', getAllUsers);
router.get('/users/:id', getUserById);
router.put('/users/:id/toggle-status', toggleUserStatus);
router.delete('/users/:id', deleteUser);
// Owner approval
router.get('/owners/pending', getPendingOwners);
router.put('/owners/:id/approve', approveOwner);
// Location approval
router.get('/locations', getAllLocations);
router.get('/locations/pending', getPendingLocations);
router.put('/locations/:id/approve', approveLocation);
router.put('/locations/:id/reject', rejectLocation);
export default router;
//# sourceMappingURL=admin.routes.js.map