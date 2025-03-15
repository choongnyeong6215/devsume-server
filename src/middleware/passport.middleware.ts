import { Request, Response, NextFunction } from "express";
import passport from "passport";
import { User } from "../types/user.type";

export const passportAuthHandler = (
  req: Request,
  res: Response,
  next: NextFunction,
  provider: string
) => {
  passport.authenticate(
    provider,
    { session: false },
    (authError: Error, user: User, info: any) => {
      if (authError) {
        next(authError);
      }

      if (!user) {
        return res.status(401).json({
          message: info.message,
        });
      }

      req.user = user;

      return next();
    }
  )(req, res, next);
};
