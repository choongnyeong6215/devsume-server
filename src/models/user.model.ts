import mongoose from "mongoose";
import { User } from "../types/user.type";

const userSchema = new mongoose.Schema<User>(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: function () {
        return this.provider === "local";
      },
    },
    provider: {
      type: String,
      enum: ["local", "kakao"],
      required: true,
    },
  },
  // 프로필 수정 고려
  {
    timestamps: {
      currentTime: () => new Date(new Date().getTime() + 9 * 60 * 60 * 1000), // KST
    },
  }
);

const UserModel = mongoose.connection.model<User>("User", userSchema);

export default UserModel;
