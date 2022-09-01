import { Router } from 'express';
import { createPhones, updatePhones } from '../controllers/phone';
import { checkToken } from '../middlewares/authentication';
import { checkAccess } from '../middlewares/authorization';

const router = Router();

router.post('/phone',  [checkToken, checkAccess], createPhones);
router.put('/phone/:id',  [checkToken, checkAccess], updatePhones);

export default router;
