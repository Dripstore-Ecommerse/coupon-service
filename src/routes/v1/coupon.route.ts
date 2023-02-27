import express, { Router } from "express";
import { validate } from "../../modules/validate";
import { couponController, couponValidation } from "../../modules/coupon";

const router: Router = express.Router();

router
  .route("/")
  .post(validate(couponValidation.createCoupon), couponController.createCoupon)
  .get(validate(couponValidation.getCoupons), couponController.getCoupons);

router
  .route("/:couponId")
  .get(validate(couponValidation.getCoupon), couponController.getCoupon)
  .patch(validate(couponValidation.updateCoupon), couponController.updateCoupon)
  .delete(
    validate(couponValidation.deleteCoupon),
    couponController.deleteCoupon
  );

export default router;
