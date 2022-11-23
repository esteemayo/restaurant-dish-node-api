import { StatusCodes } from 'http-status-codes';
import asyncHandler from 'express-async-handler';

import Order from '../models/Order.js';
import APIFeatures from '../utils/apiFeatures.js';

export const getOrders = asyncHandler(async (req, res, next) => {
  const features = new APIFeatures(Order.find(), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();

  const orders = features.query;

  res.status(StatusCodes.OK).json({
    status: 'success',
    requestedAt: req.requestTime,
    counts: orders.length,
    orders,
  });
});


export const getOrder = asyncHandler(async (req, res, next) => {
  const { id: orderId } = req.params;

  const order = await Order.findById(orderId);

  if (!order) {
    return next(
      new NotFoundError(`There is no order found with the given ID → ${orderId}`)
    );
  }

  res.status(StatusCodes.OK).json({
    status: 'success',
    order,
  });
});

export const createOrder = asyncHandler(async (req, res, next) => {
  const order = await Order.create({ ...req.body });

  res.status(StatusCodes.CREATED).json({
    status: 'success',
    order,
  });
});

export const updateOrder = asyncHandler(async (req, res, next) => {
  const { id: orderId } = req.params;

  const order = await Order.findByIdAndUpdate(
    orderId,
    { $set: { ...req.body } },
    {
      new: true,
      runValidators: true,
    }
  );

  if (!order) {
    return next(
      new NotFoundError(`There is no order found with the given ID → ${orderId}`)
    );
  }

  res.status(StatusCodes.OK).json({
    status: 'success',
    order,
  });
});

export const deleteOrder = asyncHandler(async (req, res, next) => {
  const { id: orderId } = req.params;

  const order = await Order.findByIdAndDelete(orderId);

  if (!order) {
    return next(
      new NotFoundError(`There is no order found with the given ID → ${orderId}`)
    );
  }

  res.status(StatusCodes.NO_CONTENT).json({
    status: 'success',
    order: null,
  });
});
