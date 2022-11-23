import { StatusCodes } from 'http-status-codes';
import asyncHandler from 'express-async-handler';

import Menu from '../models/Menu.js';
import APIFeatures from '../utils/apiFeatures.js';

export const getMenus = asyncHandler(async (req, res, next) => {
  const features = new APIFeatures(Menu.find(), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();

  const menus = features.query;

  res.status(StatusCodes.OK).json({
    status: 'success',
    requestedAt: req.requestTime,
    counts: menus.length,
    menus,
  });
});


export const getMenuById = asyncHandler(async (req, res, next) => { });

export const getMenuBySlug = asyncHandler(async (req, res, next) => { });

export const createMenu = asyncHandler(async (req, res, next) => { });

export const updateMenu = asyncHandler(async (req, res, next) => { });

export const deleteMenu = asyncHandler(async (req, res, next) => { });
