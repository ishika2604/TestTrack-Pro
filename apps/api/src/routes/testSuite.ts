import { Router } from 'express';
import { createTestSuite, getTestSuites } from '../controllers/testSuite';

const router = Router();

router.post('/', createTestSuite);
router.get('/', getTestSuites);

export default router;
