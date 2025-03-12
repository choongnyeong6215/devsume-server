import * as express from "express";
import passport from "passport";
import {
  kakaoLogin,
  localJoin,
  localLogin,
} from "../controllers/user.controller.ts";
import "../strategies/local.strategy.ts";
import { User } from "../types/user.type.ts";

const router = express.Router();

router.post("/local/join", localJoin);
router.post(
  "/local/login",
  (req: express.Request, res: express.Response, next: express.NextFunction) => {
    passport.authenticate(
      "local",
      { session: false },
      (authError: Error, user: User, info: any) => {
        if (authError) {
          return res.status(500).json({
            message: "Server Error Occured.",
          });
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
  },
  localLogin
);
router.get("/kakao/login", passport.authenticate("kakao", { session: false }));
router.get(
  "/kakao/callback",
  (req: express.Request, res: express.Response, next: express.NextFunction) => {
    passport.authenticate(
      "kakao",
      { session: false },
      (authError: Error, user: User, info: any) => {
        if (authError) {
          return res.status(500).json({
            message: "Server Error Occured.",
          });
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
  },
  kakaoLogin
);
router.delete("/local/token");

export default router;
