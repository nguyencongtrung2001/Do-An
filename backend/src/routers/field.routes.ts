import {Router} from 'express';
import {getFields} from '../controllers/field.controller.js'
const router = Router();
router.get('/',getFields);
export default router