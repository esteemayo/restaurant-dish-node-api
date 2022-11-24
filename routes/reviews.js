import express from 'express';

import authMiddleware from '../middlewares/authMiddleware.js';
import * as reviewController from '../controllers/reviewController.js';

const router = express.Router();

router.use(authMiddleware.protect);

router
  .route('/')
  .get(authMiddleware.restrictTo('admin'), reviewController.getReviews)
  .post(authMiddleware.restrictTo('user'), reviewController.createReview);

router
  .route('/:id')
  .get(reviewController.getReview)
  .patch(reviewController.updateReview)
  .delete(authMiddleware.restrictTo('admin'), reviewController.deleteReview);

export default router;
