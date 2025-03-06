import mongoose from "mongoose";
import { User } from "../types/user.type.ts";

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
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

export default User;
