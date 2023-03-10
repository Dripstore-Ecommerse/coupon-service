import mongoose from "mongoose";
import toJSON from "../toJSON/toJSON";
import paginate from "../paginate/paginate";
import { IUserCoupon, UserCouponModel } from "./userCoupon.interfaces";

const userCouponSchema = new mongoose.Schema<IUserCoupon>(
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

userCouponSchema.plugin(toJSON);
userCouponSchema.plugin(paginate);

const UserCoupon = mongoose.model<IUserCoupon, UserCouponModel>(
  "UserCoupon",
  userCouponSchema
);

export default UserCoupon;
