import { RefreshToken } from "./../types/token.type";
import mongoose from "mongoose";

const refreshTokenSchema = new mongoose.Schema<RefreshToken>(
  {
    token: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: {
      currentTime: () => new Date(new Date().getTime() + 9 * 60 * 60 * 1000),
    },
  }
);

const RefreshTokenModel = mongoose.model<RefreshToken>(
  "RefreshToken",
  refreshTokenSchema
);

export default RefreshTokenModel;
