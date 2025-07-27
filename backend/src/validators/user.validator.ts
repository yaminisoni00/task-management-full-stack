import Joi from 'joi';
import { USER_ROLE } from '../enums';

export const createUserSchema = Joi.object({
  email: Joi.string().email().required(),
  name: Joi.string().required(),
  role: Joi.string().valid(USER_ROLE.ADMIN, USER_ROLE.MANAGER, USER_ROLE.MEMBER).required(),
  password: Joi.string().min(4).required(),
  teamId: Joi.string().optional()
});

export const updateUserSchema = Joi.object({
  id: Joi.string().required(),
  name: Joi.string().optional(),
  role: Joi.string().valid(USER_ROLE.ADMIN, USER_ROLE.MANAGER, USER_ROLE.MEMBER).optional(),
  teamId: Joi.string().optional(),
  email: Joi.string().optional(),
});

export const deleteUserSchema = Joi.object({
  id: Joi.string().required(),
});
