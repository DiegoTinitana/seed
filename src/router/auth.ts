import { Router } from 'express';
import { login, test } from '../controllers/auth';

const router = Router();

router.post('/login', login);
router.get('/test', test);

export default router;
