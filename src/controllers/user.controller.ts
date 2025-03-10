import * as express from "express";
import { registerUser } from "../services/user.service.ts";
import { generateToken } from "../middleware/auth.middleware.ts";
import { User } from "../types/user.type.ts";

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
  const user = req.user as User;

  const { accessToken, refreshToken } = await generateToken(
    user._id.toString(),
    user.email
  );

  res.json({
    access_token: accessToken,
    refresh_token: refreshToken,
  });
};

export { localJoin, localLogin };
