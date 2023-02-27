import mongoose from "mongoose";
import toJSON from "../toJSON/toJSON";
import paginate from "../paginate/paginate";
import { ICoupon, CouponModel } from "./coupon.interfaces";

const couponSchema = new mongoose.Schema<ICoupon>(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  },
  {
    timestamps: true,
  }
);

couponSchema.plugin(toJSON);
couponSchema.plugin(paginate);

const Coupon = mongoose.model<ICoupon, CouponModel>("Coupon", couponSchema);

export default Coupon;
