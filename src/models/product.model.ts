import mongoose from "mongoose";
import { customAlphabet } from "nanoid";
import { UserDocument } from "../models/user.model";
import { string } from "zod";

const nanoid = customAlphabet("qwertyuiopasdfghjklzxcvbnm1234567890", 10);

export interface UserInput {
  user: UserDocument["_id"];
  title: string;
  description: string;
  price: number;
  image: string;
}

export interface ProductDocument extends UserInput, mongoose.Document {
  createdAt: Date;
  updatedAt: Date;
}

const productSchema = new mongoose.Schema(
  {
    productId: {
      type: string,
      required: true,
      unique: true,
      default: () => `product_${nanoid()}`,
    },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    title: { type: string, required: true },
    description: { type: string, required: true },
    price: { type: Number, required: true },
    image: { type: string, required: true },
  },
  {
    timestamps: true,
  }
);

const ProductModel = mongoose.model<ProductDocument>("product", productSchema);

export default ProductModel;
