import { Router } from 'express';
import { createProvider, deleteProviderById, getAllProviders, getProviderById, updateProvider } from '../controllers/provider';
import { checkToken } from '../middlewares/authentication';
import { checkAccess } from '../middlewares/authorization';

const router = Router();

router.post('/provider', [checkToken, checkAccess],  createProvider);
router.get('/provider', [checkToken, checkAccess], getAllProviders);
router.get('/provider/:id', [checkToken, checkAccess], getProviderById);
router.put('/provider/:id', [checkToken, checkAccess], updateProvider);
router.delete('/provider/:id', [checkToken, checkAccess], deleteProviderById);

export default router;
