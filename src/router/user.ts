import { Router } from 'express';
import { createUser, deleteUserById, getAllUsers, getUserById, updateUser } from '../controllers/user';
import { checkToken } from '../middlewares/authentication';
import { checkAccess } from '../middlewares/authorization';

const router = Router();

router.post('/user', [checkToken, checkAccess],  createUser);
router.get('/user', [checkToken, checkAccess], getAllUsers);
router.get('/user/:id', [checkToken, checkAccess], getUserById);
router.put('/user/:id', [checkToken, checkAccess], updateUser);
router.delete('/user/:id', [checkToken, checkAccess], deleteUserById);

export default router;
