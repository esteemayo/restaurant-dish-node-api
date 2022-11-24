import { StatusCodes } from 'http-status-codes';
import asyncHandler from 'express-async-handler';

import Review from '../models/Review.js';
import APIFeatures from '../utils/apiFeatures.js';
import NotFoundError from '../errors/notFound.js';

export const getReviews = asyncHandler(async (req, res, next) => {
  let filter = {};
  if (req.params.menuId) filter = { menu: req.params.menuId };

  const features = new APIFeatures(Review.find(filter), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();

  const reviews = await features.query();

  res.status(StatusCodes.OK).json({
    status: 'success',
    requestedAt: req.requestTime,
    counts: reviews.length,
    reviews,
  });
});

export const getReview = asyncHandler(async (req, res, next) => {
  const { id: reviewId } = req.params;

  const review = await Review.findById(reviewId);

  if (!review) {
    return next(
      new NotFoundError(`There is no review found with the given ID → ${reviewId}`)
    );
  }

  res.status(StatusCodes.OK).json({
    status: 'success',
    review,
  });
});

export const createReview = asyncHandler(async (req, res, next) => {
  if (!req.body.user) req.body.user = req.user.id;
  if (!req.body.menu) req.body.menu = req.params.menuId;

  const review = await Review.create({ ...req.body });

  res.status(StatusCodes.CREATED).json({
    status: 'success',
    review,
  });
});

export const updateReview = asyncHandler(async (req, res, next) => {
  const { id: reviewId } = req.params;

  const review = await Review.findByIdAndUpdate(
    reviewId,
    { $set: { ...req.body } },
    {
      new: true,
      runValidators: true,
    },
  );

  if (!review) {
    return next(
      new NotFoundError(`There is no review found with the given ID → ${reviewId}`)
    );
  }

  res.status(StatusCodes.OK).json({
    status: 'success',
    review,
  });
});

export const deleteReview = asyncHandler(async (req, res, next) => {
  const { id: reviewId } = req.params;

  const review = await Review.findByIdAndDelete(reviewId);

  if (!review) {
    return next(
      new NotFoundError(`There is no review found with the given ID → ${reviewId}`)
    );
  }

  res.status(StatusCodes.NO_CONTENT).json({
    status: 'success',
    review: null,
  });
});
