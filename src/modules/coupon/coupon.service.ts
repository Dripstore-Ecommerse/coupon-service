import httpStatus from "http-status";
import mongoose from "mongoose";
import Coupon from "./coupon.model";
import ApiError from "../errors/ApiError";
import { IOptions, QueryResult } from "../paginate/paginate";
import {
  NewCreatedCoupon,
  UpdateCouponBody,
  ICoupon,
  NewRegisteredCoupon,
} from "./coupon.interfaces";

/**
 * Create a coupon
 * @param {NewCreatedCoupon} couponBody
 * @returns {Promise<ICoupon>}
 */
export const createCoupon = async (
  couponBody: NewCreatedCoupon
): Promise<ICoupon> => {
  return Coupon.create(couponBody);
};

/**
 * Register a coupon
 * @param {NewRegisteredCoupon} couponBody
 * @returns {Promise<ICoupon>}
 */
export const registerCoupon = async (
  couponBody: NewRegisteredCoupon
): Promise<ICoupon> => {
  return Coupon.create(couponBody);
};

/**
 * Query for coupons
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @returns {Promise<QueryResult>}
 */
export const queryCoupons = async (
  filter: Record<string, any>,
  options: IOptions
): Promise<QueryResult> => {
  const coupons = await Coupon.paginate(filter, options);
  return coupons;
};

/**
 * Get coupon by id
 * @param {mongoose.Types.ObjectId} id
 * @returns {Promise<ICoupon | null>}
 */
export const getCouponById = async (
  id: mongoose.Types.ObjectId
): Promise<ICoupon | null> => Coupon.findById(id);

/**
 * Get coupon by email
 * @param {string} email
 * @returns {Promise<ICoupon | null>}
 */
export const getCouponByEmail = async (
  email: string
): Promise<ICoupon | null> => Coupon.findOne({ email });

/**
 * Update coupon by id
 * @param {mongoose.Types.ObjectId} couponId
 * @param {UpdateCouponBody} updateBody
 * @returns {Promise<ICoupon | null>}
 */
export const updateCouponById = async (
  couponId: mongoose.Types.ObjectId,
  updateBody: UpdateCouponBody
): Promise<ICoupon | null> => {
  const coupon = await getCouponById(couponId);
  if (!coupon) {
    throw new ApiError(httpStatus.NOT_FOUND, "Coupon not found");
  }

  Object.assign(coupon, updateBody);
  await coupon.save();
  return coupon;
};

/**
 * Delete coupon by id
 * @param {mongoose.Types.ObjectId} couponId
 * @returns {Promise<ICoupon | null>}
 */
export const deleteCouponById = async (
  couponId: mongoose.Types.ObjectId
): Promise<ICoupon | null> => {
  const coupon = await getCouponById(couponId);
  if (!coupon) {
    throw new ApiError(httpStatus.NOT_FOUND, "Coupon not found");
  }
  await coupon.remove();
  return coupon;
};
