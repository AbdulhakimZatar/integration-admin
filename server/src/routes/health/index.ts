import { Router } from 'express';
const router = Router();

router.get('/', async (req, res) => {
  res.json({
    message: 'OK!',
  });
});

export default router;
