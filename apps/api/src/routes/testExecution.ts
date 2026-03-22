import { Router } from 'express';
import { 
  createTestRun, 
  getTestRuns, 
  getTestExecutionById, 
  updateTestExecution, 
  updateStepExecution 
} from '../controllers/testExecution';

const router = Router();

router.post('/runs', createTestRun);
router.get('/runs', getTestRuns);
router.get('/:executionId', getTestExecutionById);
router.put('/:executionId', updateTestExecution);
router.put('/step/:stepExecutionId', updateStepExecution);

export default router;
