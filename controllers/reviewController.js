import { StatusCodes } from 'http-status-codes';
import asyncHandler from 'express-async-handler';

import Review from '../models/Review.js';
import APIFeatures from '../utils/apiFeatures.js';
import NotFoundError from '../errors/notFound.js';

export const getReviews = asyncHandler(async (req, res, next) => {
  const features = new APIFeatures(Review.find(), req.query)
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

export const getReview = asyncHandler(async (req, res, next) => { });

export const createReview = asyncHandler(async (req, res, next) => { });

export const updateReview = asyncHandler(async (req, res, next) => { });

export const deleteReview = asyncHandler(async (req, res, next) => { });
