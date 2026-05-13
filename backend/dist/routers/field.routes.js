import { Router } from 'express';
import { getFields, getMapLocations, getLocationBySlug } from '../controllers/field.controller.js';
const router = Router();
router.get('/', getFields);
router.get('/map-locations', getMapLocations);
router.get('/slug/:slug', getLocationBySlug);
export default router;
//# sourceMappingURL=field.routes.js.map