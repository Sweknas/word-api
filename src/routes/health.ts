import { Router } from 'express';

const router = Router();

router.get('/', (_, res) => {
  res.json({ status: 'ok', message: 'Service is healthy' });
});

export default router;
