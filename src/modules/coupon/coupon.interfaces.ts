import { Document, Model } from "mongoose";
import { QueryResult } from "../paginate/paginate";

export interface ICoupon extends Document {
  name: string;
  description: string;
  price: number;
  category: string;
  slug: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CouponModel extends Model<ICoupon> {
  paginate(
    filter: Record<string, any>,
    options: Record<string, any>
  ): Promise<QueryResult>;
}

export type UpdateCouponBody = Partial<ICoupon>;

// export type NewRegisteredCoupon = Omit<ICoupon, "updatedAt" | "slug">;
export type NewRegisteredCoupon = ICoupon;

// export type NewCreatedCoupon = Omit<ICoupon, "updatedAt">;
export type NewCreatedCoupon = ICoupon;
