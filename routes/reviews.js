import express from 'express';

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
