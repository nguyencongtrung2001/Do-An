import {Router} from 'express';
import {getFields, getMapLocations} from '../controllers/field.controller.js'
const router = Router();
router.get('/',getFields);
router.get('/map-locations', getMapLocations);
export default router