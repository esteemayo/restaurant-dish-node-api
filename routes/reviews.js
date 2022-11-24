import express from 'express';

import authMiddiware from '../middlewares/authMiddleware.js';
import * as reviewController from '../controllers/reviewController.js';

const router = express.Router();

router
  .route('/')
  .get(reviewController.getReviews)
  .post(reviewController.createReview);

router
  .route('/:id')
  .get(reviewController.getReview)
  .patch(reviewController.updateReview)
  .delete(reviewController.deleteReview);

export default router;
