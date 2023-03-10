import { Document, Model } from "mongoose";
import { QueryResult } from "../paginate/paginate";

export enum CouponType {
  PERCENTAGE = "percentage",
  FLAT = "flat",
  FREE_ITEM = "free_item",
  BUY_ONE_GET_ONE = "buy_one_get_one",
}

export enum UserSegment {
  NEW_CUSTOMERS = "new_customers",
  LOYAL_CUSTOMERS = "loyal_customers",
  HIGH_SPENDING_CUSTOMERS = "high_spending_customers",
}

export interface ICoupon extends Document {
  code: string;
  type: CouponType;
  value: number;
  minimum_purchase_amount?: number;
  maximum_discount_amount?: number;
  valid_from: Date;
  valid_until: Date;
  max_uses_per_user?: number;
  total_uses: number;
  user_segment: UserSegment;
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
