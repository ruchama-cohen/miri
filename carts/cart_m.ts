import mongoose, { Document, Schema } from 'mongoose';

export interface ICartItem {
  productId: string;
  name: string;
  quantity: number;
  price: number;
}

export interface ICart extends Document {
  userId: string;
  items: ICartItem[];
  createdAt: Date;
  updatedAt: Date;
}

const cartItemSchema = new Schema<ICartItem>(
  {
    productId: { type: String, required: true },
    name:      { type: String, required: true },
    quantity:  { type: Number, required: true, min: 1 },
    price:     { type: Number, required: true, min: 0 },
  },
  { _id: false } // לא ליצור _id נפרד לכל פריט
);

const cartSchema = new Schema<ICart>(
  {
    userId: { type: String, required: true },
    items:  { type: [cartItemSchema], default: [] },
  },
  {
    timestamps: true,
    versionKey: false,
    toJSON: {
      transform: (_doc, ret) => {
        delete ret._id;
        return ret;
      }
    }
  }
);

export const Cart = mongoose.model<ICart>('Cart', cartSchema);