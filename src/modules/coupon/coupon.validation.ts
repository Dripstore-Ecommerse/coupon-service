import Joi from "joi";
import { objectId } from "../validate/custom.validation";

const createCouponBody = {
  name: Joi.string().required(),
  description: Joi.string().required(),
  price: Joi.number().required(),
  category: Joi.string().required(),
};

export const createCoupon = {
  body: Joi.object().keys(createCouponBody),
};

export const getCoupons = {
  query: Joi.object().keys({
    name: Joi.string(),
    role: Joi.string(),
    sortBy: Joi.string(),
    projectBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

export const getCoupon = {
  params: Joi.object().keys({
    couponId: Joi.string().custom(objectId),
  }),
};

export const updateCoupon = {};

export const deleteCoupon = {
  params: Joi.object().keys({
    couponId: Joi.string().custom(objectId),
  }),
};
