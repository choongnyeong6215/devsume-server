import { ObjectId } from "mongoose";

type Provider = "local" | "kakao";

export interface User extends Document {
  _id: ObjectId;
  oauthId: number | null;
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
