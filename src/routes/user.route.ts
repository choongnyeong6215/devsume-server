import * as express from "express";
import passport from "passport";
import { localJoin, localLogin } from "../controllers/user.controller.ts";
import "../strategies/local.strategy.ts";
import { User } from "../types/user.type.ts";

const router = express.Router();

router.post("/local/join", localJoin);
router.post(
  "/local/login",
  (req, res, next) => {
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

export default router;
