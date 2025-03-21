import passport from "passport";
import { Strategy } from "passport-kakao";
import * as authService from "../services/user.service";

const kakaoStrategy = () => {
  passport.use(
    new Strategy(
      {
        clientID: process.env.KAKAO_CLIENT_ID,
        clientSecret: process.env.KAKAO_CLIENT_SECRET,
        callbackURL: "http://localhost:8000/auth/kakao/callback",
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          const {
            id: userId,
            _json: {
              kakao_account: { email },
            },
          } = profile;

          const existingKakaoAccount = await authService.validateKakao(userId);

          if (existingKakaoAccount) {
            return done(null, false, {
              message: "이미 가입한 계정입니다.",
            });
          }

          const user = {
            oauthId: userId,
            email,
            accessToken,
            refreshToken,
          };

          return done(null, user);
        } catch (err) {
          done(err);
        }
      }
    )
  );
};

export default kakaoStrategy;
