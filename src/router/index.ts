import { Router } from 'express';
import Auth from './auth';
import User from './user';
import Phone from './phone';
import Client from './client';
import Provider from './provider';
import Item from './item';

const router = Router();

router.use(Auth);
router.use(User);
router.use(Phone);
router.use(Client);
router.use(Provider);
router.use(Item);


export default router;
