import express from 'express';

import authMiddleware from '../middlewares/authMiddleware.js';
import * as menuController from '../controllers/menuController.js';

const router = express.Router();

router
  .route('/')
  .get(menuController.getMenus)
  .post(
    authMiddleware.protect,
    authMiddleware.restrictTo('admin'),
    menuController.createMenu
  );

export default router;
