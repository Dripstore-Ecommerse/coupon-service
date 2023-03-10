import httpStatus from "http-status";
import { Request, Response } from "express";
import mongoose from "mongoose";
import catchAsync from "../utils/catchAsync";
import ApiError from "../errors/ApiError";
import pick from "../utils/pick";
import { IOptions } from "../paginate/paginate";
import * as userCouponService from "./userCoupon.service";

export const createUserCoupon = catchAsync(
  async (req: Request, res: Response) => {
    const userCoupon = await userCouponService.createUserCoupon(req.body);
    res.status(httpStatus.CREATED).send(userCoupon);
  }
);

export const getUserCoupons = catchAsync(
  async (req: Request, res: Response) => {
    const filter = pick(req.query, ["name", "role"]);
    const options: IOptions = pick(req.query, [
      "sortBy",
      "limit",
      "page",
      "projectBy",
    ]);
    const result = await userCouponService.queryUserCoupons(filter, options);
    res.send(result);
  }
);

export const getUserCoupon = catchAsync(async (req: Request, res: Response) => {
  if (typeof req.params["userCouponId"] === "string") {
    const userCoupon = await userCouponService.getUserCouponById(
      new mongoose.Types.ObjectId(req.params["userCouponId"])
    );
    if (!userCoupon) {
      throw new ApiError(httpStatus.NOT_FOUND, "UserCoupon not found");
    }
    res.send(userCoupon);
  }
});

export const updateUserCoupon = catchAsync(
  async (req: Request, res: Response) => {
    if (typeof req.params["userCouponId"] === "string") {
      const userCoupon = await userCouponService.updateUserCouponById(
        new mongoose.Types.ObjectId(req.params["userCouponId"]),
        req.body
      );
      res.send(userCoupon);
    }
  }
);

export const deleteUserCoupon = catchAsync(
  async (req: Request, res: Response) => {
    if (typeof req.params["userCouponId"] === "string") {
      await userCouponService.deleteUserCouponById(
        new mongoose.Types.ObjectId(req.params["userCouponId"])
      );
      res.status(httpStatus.NO_CONTENT).send();
    }
  }
);
