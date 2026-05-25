import {Router} from 'express';
import {getFields, getMapLocations, getLocationBySlug, getBookedSlots} from '../controllers/field.controller.js'
const router = Router();
router.get('/',getFields);
router.get('/map-locations', getMapLocations);
router.get('/slug/:slug', getLocationBySlug);
router.get('/courts/:ma_san/booked-slots', getBookedSlots);
export default router