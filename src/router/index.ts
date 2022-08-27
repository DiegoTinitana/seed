import { Router } from 'express';
import Auth from './auth';
import User from './user';
import Phone from './phone';

const router = Router();

router.use(Auth);
router.use(User);
router.use(Phone);

export default router;
