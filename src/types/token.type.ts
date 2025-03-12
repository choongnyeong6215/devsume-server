import { ObjectId } from "mongoose";

export interface RefreshToken extends Document {
  _id: ObjectId;
  token: string;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
}
