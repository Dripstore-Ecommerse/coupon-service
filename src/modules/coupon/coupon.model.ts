import mongoose, { Schema } from "mongoose";
import toJSON from "../toJSON/toJSON";
import paginate from "../paginate/paginate";
import {
  ICoupon,
  CouponModel,
  UserSegment,
  CouponType,
} from "./coupon.interfaces";

const couponSchema: Schema = new Schema({
  code: { type: String, unique: true },
  type: { type: String, enum: Object.values(CouponType), required: true },
  value: { type: Number, required: true },
  minimum_purchase_amount: { type: Number },
  maximum_discount_amount: { type: Number },
  valid_from: { type: Date, required: true },
  valid_until: { type: Date, required: true },
  max_uses_per_user: { type: Number },
  total_uses: { type: Number, default: 0 },
  user_segment: {
    type: String,
    enum: Object.values(UserSegment),
    required: true,
  },
});

couponSchema.plugin(toJSON);
couponSchema.plugin(paginate);

const Coupon = mongoose.model<ICoupon, CouponModel>("Coupon", couponSchema);

export default Coupon;
