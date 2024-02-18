import express from 'express';
import {createfruitJuiceController,deletefruitJuiceController,getfruitJuiceController, getSinglefruitJuiceController, fruitJuiceCountController, fruitJuicePhotoController, updatefruitJuiceController, fruitJuiceListController} from '../controllers/fruitJuiceController.js';
import { requiresSignIn,isAdmin } from '../middleware/authMiddleware.js';
import formidable from 'express-formidable';

const router=express.Router();

router.post('/fruitJuices',requiresSignIn,isAdmin,formidable(),createfruitJuiceController);
router.get('/fruitJuices',getfruitJuiceController);
router.get('/fruitJuices/:slug',getSinglefruitJuiceController);
router.get('/fruitJuice/fruit-photo/:pid',fruitJuicePhotoController);
router.put('/fruitJuices/:id',requiresSignIn,isAdmin,formidable(),updatefruitJuiceController)
router.delete('/fruitJuices/:id',requiresSignIn,isAdmin,deletefruitJuiceController);
router.get('/fruitJuice-count',fruitJuiceCountController);
router.get('/fruitJuicesList/:page',fruitJuiceListController)

export default router;