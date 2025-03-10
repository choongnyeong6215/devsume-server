import { ObjectId } from "mongoose";

type Provider = "local" | "kakao";

export interface User extends Document {
  _id: ObjectId;
  email: string;
  password?: string;
  provider: Provider;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
}
