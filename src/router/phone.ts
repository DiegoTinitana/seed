import { Router } from 'express';
import { createPhones } from '../controllers/phone';
import { checkToken } from '../middlewares/authentication';
import { checkAccess } from '../middlewares/authorization';

const router = Router();

router.post('/phone', createPhones);

export default router;
