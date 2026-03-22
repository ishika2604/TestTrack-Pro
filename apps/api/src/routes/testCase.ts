import { Router } from 'express';
import { createTestCase, getTestCases, getTestCaseById, updateTestCase, deleteTestCase } from '../controllers/testCase';

const router = Router();

router.post('/', createTestCase);
router.get('/', getTestCases);
router.get('/:id', getTestCaseById);
router.put('/:id', updateTestCase);
router.delete('/:id', deleteTestCase);

export default router;
