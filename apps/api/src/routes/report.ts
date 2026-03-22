import { Router } from 'express';
import { getExecutionReport, getBugMetrics } from '../controllers/report';

const router = Router();

router.get('/execution', getExecutionReport);
router.get('/bugs', getBugMetrics);

export default router;
