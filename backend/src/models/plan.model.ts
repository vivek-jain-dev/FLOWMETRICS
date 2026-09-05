import mongoose, { Document, Schema } from 'mongoose';

export interface IPricingPlan extends Document {
  name: string;
  price: number;
  billingCycle: 'monthly' | 'yearly';
  features: string[];
  highlighted: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const pricingPlanSchema = new Schema<IPricingPlan>(
  {
    name: {
      type: String,
      required: [true, 'Plan name is required'],
      trim: true,
      maxlength: [100, 'Plan name cannot exceed 100 characters'],
    },
    price: {
      type: Number,
      required: [true, 'Price is required'],
      min: [0, 'Price must be greater than or equal to 0'],
    },
    billingCycle: {
      type: String,
      enum: ['monthly', 'yearly'],
      default: 'monthly',
    },
    features: {
      type: [String],
      required: [true, 'Features list is required'],
      validate: [
        (val: string[]) => val.length > 0,
        'At least one feature is required',
      ],
    },
    highlighted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform: (_, ret: any) => {
        delete ret.__v;
        return ret;
      },
    },
  }
);

export const PricingPlan = mongoose.model<IPricingPlan>('PricingPlan', pricingPlanSchema);
