import { FilterQuery } from "mongoose";
import userModel, { UserDocument } from "../models/user.model";

export async function createUser(
  input: FilterQuery<
  Omit<UserDocument, "createdAt" | "updatedAt" | "comparePassword">>
) {
  try {
    return await userModel.create(input);
  } catch (e: any) {
    throw new Error(e);
  }
}
