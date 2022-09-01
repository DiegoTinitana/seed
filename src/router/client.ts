import { Router } from 'express';
import { createClient, deleteClientById, getAllClients, getClientById, updateClient } from '../controllers/client';
import { checkToken } from '../middlewares/authentication';
import { checkAccess } from '../middlewares/authorization';

const router = Router();

router.post('/client', [checkToken, checkAccess],  createClient);
router.get('/client', [checkToken, checkAccess], getAllClients);
router.get('/client/:id', [checkToken, checkAccess], getClientById);
router.put('/client/:id', [checkToken, checkAccess], updateClient);
router.delete('/client/:id', [checkToken, checkAccess], deleteClientById);

export default router;
