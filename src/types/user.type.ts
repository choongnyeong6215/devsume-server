import { ObjectId } from "mongoose";

export type Provider = "local" | "kakao";

export interface User extends Document {
  _id: ObjectId;
  oauthId: string;
  email: string;
  password?: string;
  provider: Provider;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
}

export interface Token {
  accessToken: string;
  refreshToken: string;
}
