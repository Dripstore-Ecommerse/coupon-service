import { Document, Model } from "mongoose";
import { QueryResult } from "../paginate/paginate";

export interface IUserCoupon extends Document {
  name: string;
  description: string;
  price: number;
  category: string;
  slug: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserCouponModel extends Model<IUserCoupon> {
  paginate(
    filter: Record<string, any>,
    options: Record<string, any>
  ): Promise<QueryResult>;
}

export type UpdateUserCouponBody = Partial<IUserCoupon>;

// export type NewRegisteredUserCoupon = Omit<IUserCoupon, "updatedAt" | "slug">;
export type NewRegisteredUserCoupon = IUserCoupon;

// export type NewCreatedUserCoupon = Omit<IUserCoupon, "updatedAt">;
export type NewCreatedUserCoupon = IUserCoupon;
