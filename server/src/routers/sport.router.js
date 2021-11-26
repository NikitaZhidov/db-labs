import { Router } from 'express';
import sportController from '../controllers/sport.controller.js';

const router = Router();

router.get('/judge', sportController.getAllJudges);
router.get('/sportsman', sportController.getAllSportsmans);
router.post('/sportsman-rating', sportController.addPointToSportsman);
router.get('/sportsman-rating', sportController.getAllSportsmansWithRating);

export default router;
