import { Router } from 'express';
import { createBillOfSales, getAllBillOfSales } from '../controllers/billOfSales';
import { checkToken } from '../middlewares/authentication';
import { checkAccess } from '../middlewares/authorization';

const router = Router();

router.post('/sales', [checkToken, checkAccess],  createBillOfSales);
router.get('/sales', [checkToken, checkAccess],  getAllBillOfSales);

export default router;
