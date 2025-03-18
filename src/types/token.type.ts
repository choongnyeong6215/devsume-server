import { ObjectId } from "mongoose";

export interface RefreshToken extends Document {
  _id: ObjectId;
  oauthId: string;
  token: string;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
}

export interface KakaoRefreshResponse {
  access_token: string;
  token_type: string;
  refresh_token?: string;
  refresh_token_expires_in?: number;
  expires_in: number;
}
