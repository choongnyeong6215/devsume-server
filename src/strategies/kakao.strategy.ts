import passport from "passport";
import { Strategy } from "passport-kakao";
import { validateKakao, registerKakao } from "../services/user.service";

const kakaoStrategy = () => {
  passport.use(
    new Strategy(
      {
        clientID: process.env.KAKAO_CLIENT_ID as string,
        clientSecret: process.env.KAKAO_CLIENT_SECRET as string,
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

          const existingKakaoAccount = await validateKakao(userId);

          if (existingKakaoAccount) {
            return done(null, false, {
              message: "이미 가입한 계정입니다.",
            });
          }

          await registerKakao(Number(userId), email);

          const user = { accessToken, refreshToken, userId, email };

          return done(null, user);
        } catch (err) {
          console.log(err);
          done(err);
        }
      }
    )
  );
};

export default kakaoStrategy;
