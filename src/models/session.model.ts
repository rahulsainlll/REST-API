import mongoose from "mongoose";
import { UserDocument } from "../models/user.model";

export interface UserInput {
  user: UserDocument["_id"];
  valid: boolean;
  userAgent: string;
}

export interface SessionDoucment extends UserInput, mongoose.Document {
  createdAt: Date;
  updatedAt: Date;
}

const sessionSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    valid: { type: Boolean, default: true },
    userAgent: { type: String },
  },
  {
    timestamps: true,
  }
);

const sessionModel = mongoose.model("session", sessionSchema);

export default sessionModel;
