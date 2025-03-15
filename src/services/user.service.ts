import { User } from "./../types/user.type";
import * as bcrypt from "bcrypt";
import UserModel from "../models/user.model";
import { PROVIDER } from "../constants";
import { v4 as uuidv4 } from "uuid";

export const registerUser = async (
  email: string,
  password: string
): Promise<User> => {
  const existingUser = await UserModel.findOne({ email });

  if (existingUser) {
    throw new Error("이미 가입한 이메일입니다.");
  }

  const hashedPassword = await bcrypt.hash(password, 12);

  const newUser = new UserModel({
    oauthId: uuidv4(),
    email,
    password: hashedPassword,
    provider: PROVIDER.local,
  });

  return newUser.save();
};

export const validateUser = async (
  email: string,
  password: string
): Promise<User | null> => {
  const user = await UserModel.findOne({ email });

  if (user && (await bcrypt.compare(password, user.password as string))) {
    return user;
  }

  return null;
};

export const validateKakao = async (userId: string): Promise<User | null> => {
  const user = await UserModel.findOne({ oauthId: userId });

  if (user) {
    return user;
  }

  return null;
};

export const registerKakao = async (
  oauthId: string,
  email?: string
): Promise<User> => {
  const newUser = new UserModel({
    oauthId,
    email,
    provider: PROVIDER.kakao,
  });

  return newUser.save();
};
