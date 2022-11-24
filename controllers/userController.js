import _ from 'lodash';
import { StatusCodes } from 'http-status-codes';
import asyncHandler from 'express-async-handler';

import User from '../models/User.js';
import createSendToken from '../utils/createSendToken.js';

export const register = asyncHandler(async (req, res, next) => {
  const newUser = _.pick(req.body, ['name', 'email', 'role', 'password', 'confirmPassword']);

  const user = await User.create({ ...newUser });

  if (user) {
    createSendToken(user, StatusCodes.CREATED, req, res);
  }
});
