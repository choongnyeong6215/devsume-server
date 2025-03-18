import { Response } from "express";

export const sendCookie = (res: Response, token: string) => {
  res.cookie("refresh_token", token, {
    httpOnly: true,
    maxAge: 24 * 7 * 60 * 60 * 1000, // 7일
  });
};
