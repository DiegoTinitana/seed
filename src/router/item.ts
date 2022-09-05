import { Router } from 'express';
import { createItem, getAllItems, getItemByCodeOrBarCode, getItemsById, updateItems } from '../controllers/item';
import { checkToken } from '../middlewares/authentication';
import { checkAccess } from '../middlewares/authorization';

const router = Router();

router.post('/item', [checkToken, checkAccess],  createItem);
router.get('/item', [checkToken, checkAccess], getAllItems);
router.get('/item/code', [checkToken, checkAccess], getItemByCodeOrBarCode);
router.get('/item/:id', [checkToken, checkAccess], getItemsById);
router.put('/item/:id', [checkToken, checkAccess], updateItems);

export default router;
