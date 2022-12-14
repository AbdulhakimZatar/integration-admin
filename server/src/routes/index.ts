import { Router } from 'express';
import healthRouter from './health';
import teamsRouter from './teams';
const router = Router();

router.use('/health', healthRouter);
router.use('/teams', teamsRouter);

export default router;
