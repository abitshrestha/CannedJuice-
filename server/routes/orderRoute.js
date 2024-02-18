import express from 'express';
import { createOrder } from '../controllers/orderController.js';
import { requiresSignIn } from '../middleware/authMiddleware.js';

export const orderRouter=express.Router();

orderRouter.post('/orders',requiresSignIn,createOrder);