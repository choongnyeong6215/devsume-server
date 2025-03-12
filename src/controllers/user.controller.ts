import * as express from "express";
import { registerUser } from "../services/user.service.ts";
import { Token, User } from "../types/user.type.ts";

const localJoin = async (
  req: express.Request,
  res: express.Response
): Promise<void> => {
  const { email, password } = req.body;

  try {
    await registerUser(email, password);

    res.status(201).json({
      message: "회원가입 완료!",
    });
  } catch (err) {
    console.error(err);

    res.status(500).json({
      message: "Server Error Occured",
    });
  }
};

const localLogin = async (
  req: express.Request,
  res: express.Response
): Promise<void> => {
  const user = req.user as User & Token;

  res.json({
    accessToken: user.accessToken,
    refreshToken: user.refreshToken,
  });
};

const kakaoLogin = async (
  req: express.Request,
  res: express.Response
): Promise<void> => {
  res.json(req.user);
};

export { localJoin, localLogin, kakaoLogin };
