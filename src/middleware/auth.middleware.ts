import { Request, Response, NextFunction } from "express";
import * as jwt from "jsonwebtoken";
import RefreshTokenModel from "../models/token.model";
import { User } from "../types/user.type";
import { PROVIDER } from "../constants";
import axios from "axios";
import { KakaoRefreshResponse } from "../types/token.type";

export const generateAccessToken = (user: User) => {
  const payload = {
    oauthId: user.oauthId,
    email: user.email,
  };

  return jwt.sign(payload, process.env.JWT_SECRET_KEY, {
    expiresIn: "30m",
  });
};

export const generateRefreshToken = async (
  provider: string,
  oauthId: string,
  refreshToken?: string
) => {
  let token;

  const payload = {
    oauthId,
  };

  if (provider === PROVIDER.local) {
    token = jwt.sign(payload, process.env.JWT_SECRET_KEY, {
      expiresIn: "7d",
    });
  } else if (provider === PROVIDER.kakao) {
    token = refreshToken;
  }

  await RefreshTokenModel.findOneAndUpdate(
    {
      oauthId,
    },
    {
      token,
    },
    {
      new: true,
      upsert: true,
    }
  );

  return token;
};

export const validateAccessToken = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const authHeader = req.headers["authorization"];

  if (!authHeader) {
    res.status(401).json({
      message: "토큰이 존재하지 않습니다.",
    });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

    req.user = decoded;

    return next();
  } catch (err) {
    if (err instanceof jwt.TokenExpiredError) {
      res.status(401).json({
        message: "유효기간이 만료된 토큰입니다.",
      });
    }

    res.status(401).json({
      message: "유효하지 않은 토큰입니다.",
    });
  }
};

export const refreshAccessToken = async (
  req: Request,
  res: Response
): Promise<void> => {
  const refreshToken = req.cookies["refresh-token"];

  if (!refreshToken) {
    res.status(401).json({
      message: "리프레시 토큰이 존재하지 않습니다.",
    });
  }

  try {
    const decoded = jwt.verify(
      refreshToken,
      process.env.JWT_SECRET_KEY
    ) as jwt.JwtPayload;

    if (!decoded.oauthId) {
      res.status(401).json({
        message: "유효하지 않은 리프레시 토큰입니다.",
      });
    }

    const payload = {
      oauthId: decoded.oauthId,
    };

    const newAccessToken = jwt.sign(payload, process.env.JWT_SECRET_KEY, {
      expiresIn: "30m",
    });

    res.status(200).json({
      accessToken: newAccessToken,
    });
  } catch (err) {
    const decoded = jwt.decode(refreshToken) as jwt.JwtPayload;

    // 리프레시 토큰 삭제
    if (decoded?.oauthId) await removeRefreshToken(decoded.oauthId);

    if (err instanceof jwt.TokenExpiredError) {
      res.status(401).json({
        message: "유효기간이 만료된 토큰입니다.",
      });
    }

    if (err instanceof jwt.JsonWebTokenError) {
      res.status(401).json({
        message: "유효하지 않은 리프레시 토큰입니다.",
      });
    }

    res.status(500).json({
      message: "서버 오류 발생",
    });
  }
};

export const getRefreshToken = async (oauthId: string) => {
  const refreshToken = await RefreshTokenModel.findOne({ oauthId });

  return refreshToken.token;
};

export const removeRefreshToken = async (oauthId: string) => {
  return await RefreshTokenModel.deleteOne({ oauthId });
};

export const reIssueKakaoAccessToken = async (refreshToken: string) => {
  const existingToken = await RefreshTokenModel.findOne({
    token: refreshToken,
  });

  if (!existingToken) {
    throw new Error("가입하지 않은 사용자입니다.");
  }

  try {
    const response = await axios.post<KakaoRefreshResponse>(
      "https://kauth.kakao.com/oauth/token",
      {
        grant_type: "refresh_token",
        client_id: process.env.KAKAO_CLIENT_ID,
        refresh_token: refreshToken,
        client_secret: process.env.KAKAO_CLIENT_SECRET,
      },
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded; charset=utf-8",
        },
      }
    );
    return {
      accessToken: response.data.access_token,
    };
  } catch (err) {
    console.log(err);
  }
};
