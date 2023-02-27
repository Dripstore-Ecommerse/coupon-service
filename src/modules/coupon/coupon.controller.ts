import httpStatus from "http-status";
import { Request, Response } from "express";
import mongoose from "mongoose";
import catchAsync from "../utils/catchAsync";
import ApiError from "../errors/ApiError";
import pick from "../utils/pick";
import { IOptions } from "../paginate/paginate";
import * as couponService from "./coupon.service";

export const createCoupon = catchAsync(async (req: Request, res: Response) => {
  const coupon = await couponService.createCoupon(req.body);
  res.status(httpStatus.CREATED).send(coupon);
});

export const getCoupons = catchAsync(async (req: Request, res: Response) => {
  const filter = pick(req.query, ["name", "role"]);
  const options: IOptions = pick(req.query, [
    "sortBy",
    "limit",
    "page",
    "projectBy",
  ]);
  const result = await couponService.queryCoupons(filter, options);
  res.send(result);
});

export const getCoupon = catchAsync(async (req: Request, res: Response) => {
  if (typeof req.params["couponId"] === "string") {
    const coupon = await couponService.getCouponById(
      new mongoose.Types.ObjectId(req.params["couponId"])
    );
    if (!coupon) {
      throw new ApiError(httpStatus.NOT_FOUND, "Coupon not found");
    }
    res.send(coupon);
  }
});

export const updateCoupon = catchAsync(async (req: Request, res: Response) => {
  if (typeof req.params["couponId"] === "string") {
    const coupon = await couponService.updateCouponById(
      new mongoose.Types.ObjectId(req.params["couponId"]),
      req.body
    );
    res.send(coupon);
  }
});

export const deleteCoupon = catchAsync(async (req: Request, res: Response) => {
  if (typeof req.params["couponId"] === "string") {
    await couponService.deleteCouponById(
      new mongoose.Types.ObjectId(req.params["couponId"])
    );
    res.status(httpStatus.NO_CONTENT).send();
  }
});
