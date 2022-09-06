import { Router } from 'express';
import {
  createCategories,
  deleteCategoryById,
  getAllCategories,
  getCategoryById,
  setCategoryToItems,
  updateCategories,
} from '../controllers/category';
import { checkToken } from '../middlewares/authentication';
import { checkAccess } from '../middlewares/authorization';

const router = Router();

router.post('/category', [checkToken, checkAccess], createCategories);
router.post('/category/items', [checkToken, checkAccess], setCategoryToItems);
router.get('/category', [checkToken, checkAccess], getAllCategories);
router.get('/category/:id', [checkToken, checkAccess], getCategoryById);
router.put('/category/:id', [checkToken, checkAccess], updateCategories);
router.delete('/category/:id', [checkToken, checkAccess], deleteCategoryById);

export default router;
