import express from 'express';
import { requiresSignIn,isAdmin } from '../middleware/authMiddleware.js';
import {categoryController, createCategoryController,deleteCategoryController,singleCategoryController,updateCategoryController} from '../controllers/categoryController.js';

const router=express.Router();

router.post('/category',requiresSignIn,isAdmin,createCategoryController);
router.put('/category/:id',requiresSignIn,isAdmin,updateCategoryController);
router.get('/category',categoryController);
router.get('/category/:slug',singleCategoryController);
router.delete('/category/:id',requiresSignIn,isAdmin,deleteCategoryController);

export default router;