import Joi from "joi";
import { objectId } from "../validate/custom.validation";

const createUserCouponBody = {
  name: Joi.string().required(),
  description: Joi.string().required(),
  price: Joi.number().required(),
  category: Joi.string().required(),
};

export const createUserCoupon = {
  body: Joi.object().keys(createUserCouponBody),
};

export const getUserCoupons = {
  query: Joi.object().keys({
    name: Joi.string(),
    role: Joi.string(),
    sortBy: Joi.string(),
    projectBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

export const getUserCoupon = {
  params: Joi.object().keys({
    userCouponId: Joi.string().custom(objectId),
  }),
};

export const updateUserCoupon = {};

export const deleteUserCoupon = {
  params: Joi.object().keys({
    userCouponId: Joi.string().custom(objectId),
  }),
};
