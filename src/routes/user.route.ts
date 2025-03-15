import { Router } from "express";
import passport from "passport";
import * as authController from "../controllers/user.controller.ts";
import "../strategies/local.strategy.ts";
import * as passportMiddleware from "../middleware/passport.middleware.ts";
import { PROVIDER } from "../constants/index.ts";

const router = Router();

router.post("/local/join", authController.localJoin);
router.post(
  "/local/login",
  (req, res, next) =>
    passportMiddleware.passportAuthHandler(req, res, next, PROVIDER.local),
  authController.localLogin
);
router.get(
  "/kakao/login",
  passport.authenticate(PROVIDER.kakao, { session: false })
);
router.get(
  "/kakao/callback",
  (req, res, next) =>
    passportMiddleware.passportAuthHandler(req, res, next, PROVIDER.kakao),
  authController.kakaoLogin
);
router.delete("/local/token");

export default router;
