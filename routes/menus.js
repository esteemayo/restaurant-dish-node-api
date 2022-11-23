import express from 'express';

import authMiddleware from '../middlewares/authMiddleware.js';
import * as menuController from '../controllers/menuController.js';

const router = express.Router();

router.get('/details/:slug', menuController.getMenuBySlug);

router
  .route('/')
  .get(menuController.getMenus)
  .post(
    authMiddleware.protect,
    authMiddleware.restrictTo('admin'),
    menuController.createMenu
  );

router
  .route('/:id')
  .get(menuController.getMenuById)
  .patch(
    authMiddleware.protect,
    authMiddleware.restrictTo('admin'),
    menuController.updateMenu
  )
  .delete(
    authMiddleware.protect,
    authMiddleware.restrictTo('admin'),
    menuController.deleteMenu
  );

export default router;
