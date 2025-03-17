import { Request, Response, NextFunction } from "express";
import * as authService from "../services/user.service.ts";
import { LocalJoinDto } from "../dtos/local-auth.dto.ts";
import * as authMiddleware from "../middleware/auth.middleware.ts";
import { Token, User } from "../types/user.type.ts";
import { PROVIDER } from "../constants/index.ts";

export const localJoin = async (
  req: Request<{}, {}, LocalJoinDto>,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { email, password } = req.body;

  try {
    const user = await authService.registerUser(email, password);

    res.status(201).json(user);
  } catch (err) {
    next(err);
  }
};

export const localLogin = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const user = req.user as User;

  try {
    const [accessToken, refreshToken] = await Promise.all([
      authMiddleware.generateAccessToken(user),
      authMiddleware.generateRefreshToken(PROVIDER.local, user.oauthId),
    ]);

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      maxAge: 24 * 7 * 60 * 60 * 1000, // 7일
    });

    res.status(200).json({
      email: user.email,
      accessToken,
    });
  } catch (err) {
    next(err);
  }
};

export const kakaoLogin = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const user = req.user as User & Token;

  try {
    await authService.registerKakao(user.oauthId, user?.email);

    await authMiddleware.generateRefreshToken(
      PROVIDER.kakao,
      user.oauthId,
      user.refreshToken
    );

    res.status(200).json({
      email: user?.email,
      accessToken: user.accessToken,
    });
  } catch (err) {
    next(err);
  }
};
