import mongoose from "mongoose";
import bcrypt from "bcrypt";
import config from "config";

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  password: { type: String, required: true },
},{
    timestamps:true
});

const userModel = mongoose.model("User", userSchema);

export default userModel;
