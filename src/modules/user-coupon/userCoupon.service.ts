import httpStatus from "http-status";
import mongoose from "mongoose";
import UserCoupon from "./userCoupon.model";
import ApiError from "../errors/ApiError";
import { IOptions, QueryResult } from "../paginate/paginate";
import {
  NewCreatedUserCoupon,
  UpdateUserCouponBody,
  IUserCoupon,
  NewRegisteredUserCoupon,
} from "./userCoupon.interfaces";

/**
 * Create a userCoupon
 * @param {NewCreatedUserCoupon} userCouponBody
 * @returns {Promise<IUserCoupon>}
 */
export const createUserCoupon = async (
  userCouponBody: NewCreatedUserCoupon
): Promise<IUserCoupon> => {
  return UserCoupon.create(userCouponBody);
};

/**
 * Register a userCoupon
 * @param {NewRegisteredUserCoupon} userCouponBody
 * @returns {Promise<IUserCoupon>}
 */
export const registerUserCoupon = async (
  userCouponBody: NewRegisteredUserCoupon
): Promise<IUserCoupon> => {
  return UserCoupon.create(userCouponBody);
};

/**
 * Query for userCoupons
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @returns {Promise<QueryResult>}
 */
export const queryUserCoupons = async (
  filter: Record<string, any>,
  options: IOptions
): Promise<QueryResult> => {
  const userCoupons = await UserCoupon.paginate(filter, options);
  return userCoupons;
};

/**
 * Get userCoupon by id
 * @param {mongoose.Types.ObjectId} id
 * @returns {Promise<IUserCoupon | null>}
 */
export const getUserCouponById = async (
  id: mongoose.Types.ObjectId
): Promise<IUserCoupon | null> => UserCoupon.findById(id);

/**
 * Get userCoupon by email
 * @param {string} email
 * @returns {Promise<IUserCoupon | null>}
 */
export const getUserCouponByEmail = async (
  email: string
): Promise<IUserCoupon | null> => UserCoupon.findOne({ email });

/**
 * Update userCoupon by id
 * @param {mongoose.Types.ObjectId} userCouponId
 * @param {UpdateUserCouponBody} updateBody
 * @returns {Promise<IUserCoupon | null>}
 */
export const updateUserCouponById = async (
  userCouponId: mongoose.Types.ObjectId,
  updateBody: UpdateUserCouponBody
): Promise<IUserCoupon | null> => {
  const userCoupon = await getUserCouponById(userCouponId);
  if (!userCoupon) {
    throw new ApiError(httpStatus.NOT_FOUND, "UserCoupon not found");
  }

  Object.assign(userCoupon, updateBody);
  await userCoupon.save();
  return userCoupon;
};

/**
 * Delete userCoupon by id
 * @param {mongoose.Types.ObjectId} userCouponId
 * @returns {Promise<IUserCoupon | null>}
 */
export const deleteUserCouponById = async (
  userCouponId: mongoose.Types.ObjectId
): Promise<IUserCoupon | null> => {
  const userCoupon = await getUserCouponById(userCouponId);
  if (!userCoupon) {
    throw new ApiError(httpStatus.NOT_FOUND, "UserCoupon not found");
  }
  await userCoupon.remove();
  return userCoupon;
};
