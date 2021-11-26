import { Router } from 'express';
import fontController from '../controllers/font.controller.js';

const router = Router();

router.get('/user', fontController.getAllUsers);
router.post('/user', fontController.createUser);
router.get('/user/:name', fontController.getUserFontSettings);
router.patch('/user/:name', fontController.updateFontSettings);

export default router;
