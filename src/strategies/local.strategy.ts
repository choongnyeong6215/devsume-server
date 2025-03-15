import passport from "passport";
import { Strategy } from "passport-local";
import * as authService from "../services/user.service.ts";

const localStrategy = () => {
  passport.use(
    new Strategy(
      { usernameField: "email", passwordField: "password" },
      async (email, password, done) => {
        try {
          const user = await authService.validateUser(email, password);

          if (!user) {
            return done(null, false, {
              message: "아이디, 비밀번호를 확인해주세요.",
            });
          }
          return done(null, user);
        } catch (err) {
          return done(err);
        }
      }
    )
  );
};

export default localStrategy;
