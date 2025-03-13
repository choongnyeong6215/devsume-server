import * as jwt from "jsonwebtoken";
import * as express from "express";
import RefreshTokenModel from "../models/token.model";
import { User } from "../types/user.type";

const generateAccessToken = (user: User) => {
  const payload = {
    id: user._id,
    email: user.email,
  };

  return jwt.sign(payload, process.env.JWT_SECRET_KEY as string, {
    expiresIn: "10m",
  });
};

const generateRefreshToken = async () => {
  const refreshToken = jwt.sign({}, process.env.JWT_SECRET_KEY as string, {
    expiresIn: "7d",
  });

  await RefreshTokenModel.create({
    token: refreshToken,
  });

  return refreshToken;
};

const verifyAccessToken = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  const authHeader = req.headers["authorization"];

  if (!authHeader) {
    return res.status(401).json({
      message: "토큰이 존재하지 않습니다.",
    });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY as string);

    req.user = decoded;

    return next();
  } catch (err) {
    if (err instanceof jwt.TokenExpiredError) {
      console.log("유효기간이 만료된 토큰입니다.");

      return refreshAccessToken(req, res, next);
    }

    return res.status(403).json({
      message: "유효하지 않은 토큰입니다.",
    });
  }
};

const refreshAccessToken = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
): Promise<any> => {
  const refreshToken = req.headers["refresh-token"];

  if (!refreshToken) {
    return res.status(401).json({
      message: "refresh 토큰이 존재하지 않습니다.",
    });
  }

  try {
    const existingRefreshToken = await RefreshTokenModel.findOne({
      token: refreshToken,
    });

    if (!existingRefreshToken) {
      return res.status(403).json({
        message: "유효하지 않은 refresh 토큰입니다.",
      });
    }

    const newAccessToken = generateAccessToken(req.user as User);

    return res.status(200).json({
      accessToken: newAccessToken,
    });
  } catch (err) {
    return res.status(403).json({
      message: "refresh 토큰 검증 실패",
    });
  }
};

const removeRefeshToken = async (
  req: express.Request,
  res: express.Response
) => {
  const refreshToken = req.headers["refresh-token"];

  if (!refreshToken) {
    return res.status(401).json({
      message: "refresh 토큰이 존재하지 않습니다.",
    });
  }

  try {
    await RefreshTokenModel.deleteOne({
      token: refreshToken,
    });

    return res.status(200).json({
      message: "refresh 토큰 삭제 완료",
    });
  } catch (err) {}
};

export {
  generateAccessToken,
  generateRefreshToken,
  verifyAccessToken,
  refreshAccessToken,
  removeRefeshToken,
};
