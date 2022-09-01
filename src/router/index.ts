import { Router } from 'express';
import Auth from './auth';
import User from './user';
import Phone from './phone';
import Client from './client';
import Provider from './provider';

const router = Router();

router.use(Auth);
router.use(User);
router.use(Phone);
router.use(Client);
router.use(Provider);


export default router;
