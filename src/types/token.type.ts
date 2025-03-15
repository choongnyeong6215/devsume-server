import { ObjectId } from "mongoose";

export interface RefreshToken extends Document {
  _id: ObjectId;
  oauthId: string;
  token: string;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
}
