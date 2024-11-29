import { Router } from 'express';
import wordController from '../controllers/word';

const router = Router();

router.post('/frequency', async (req, res, next) => {
  try {
    const result = await wordController.countFrequency(req.body);
    res.json(result);
  } catch (error) {
    next(error);
  }
});

export default router;
