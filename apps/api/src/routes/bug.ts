import { Router } from 'express';
import { createBug, getBugs, getBugById, updateBugStatus, addComment } from '../controllers/bug';

const router = Router();

router.post('/', createBug);
router.get('/', getBugs);
router.get('/:id', getBugById);
router.put('/:id/status', updateBugStatus);
router.post('/:id/comments', addComment);

export default router;
