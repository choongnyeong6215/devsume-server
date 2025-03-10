import * as jwt from "jsonwebtoken";
import RefreshTokenModel from "../models/token.model";

const generateToken = async (userId: string, email: string) => {
  const accessToken = jwt.sign(
    { userId, email },
    process.env.JWT_SECRET_KEY as string,
    {
      expiresIn: "10m",
    }
  );

  const refreshToken = jwt.sign(
    { userId, email },
    process.env.JWT_SECRET_KEY as string,
    {
      expiresIn: "7d",
    }
  );

  await RefreshTokenModel.create({
    userId,
    token: refreshToken,
  });

  return { accessToken, refreshToken };
};

export { generateToken };
