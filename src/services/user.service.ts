import { User } from "./../types/user.type";
import * as bcrypt from "bcrypt";
import UserModel from "../models/user.model";

const registerUser = async (email: string, password: string): Promise<User> => {
  const existingUser = await UserModel.findOne({ email });

  if (existingUser) {
    throw new Error("이미 존재하는 이메일입니다.");
  }

  const hashedPassword = await bcrypt.hash(password, 12);

  const newUser = new UserModel({
    email,
    password: hashedPassword,
    provider: "local",
  });

  return newUser.save();
};

const validateUser = async (
  email: string,
  password: string
): Promise<User | null> => {
  const user = await UserModel.findOne({ email });

  if (user && (await bcrypt.compare(password, user.password as string))) {
    return user;
  }

  return null;
};

export { registerUser, validateUser };
