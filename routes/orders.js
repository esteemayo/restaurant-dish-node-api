import express from 'express';

import authMiddleware from '../middlewares/authMiddleware.js';
import * as orderController from '../controllers/orderController.js';

const router = express.Router();

router.use(authMiddleware.protect);

router
  .route('/')
  .get(authMiddleware.restrictTo('admin'), orderController.getOrders)
  .post(authMiddleware.restrictTo('user'), orderController.createOrder);

router
  .route('/:id')
  .get(orderController.getOrder)
  .patch(authMiddleware.restrictTo('admin'), orderController.updateOrder)
  .delete(authMiddleware.restrictTo('admin'), orderController.deleteOrder);

export default router;
