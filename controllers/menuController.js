import { StatusCodes } from 'http-status-codes';
import asyncHandler from 'express-async-handler';

import Menu from '../models/Menu.js';
import APIFeatures from '../utils/apiFeatures.js';
import NotFoundError from '../errors/notFound.js';

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


export const getMenuById = asyncHandler(async (req, res, next) => {
  const { id: menuId } = req.params;

  const menu = await Menu.findById(menuId);

  if (!menu) {
    return next(
      new NotFoundError(`There is no menu found with the given ID → ${menuId}`)
    );
  }

  res.status(StatusCodes.OK).json({
    status: 'success',
    menu,
  });
});

export const getMenuBySlug = asyncHandler(async (req, res, next) => { });

export const createMenu = asyncHandler(async (req, res, next) => { });

export const updateMenu = asyncHandler(async (req, res, next) => { });

export const deleteMenu = asyncHandler(async (req, res, next) => { });
