import passport from "passport";
import { Strategy } from "passport-local";
import { validateUser } from "../services/user.service";

const localStrategy = () => {
  passport.use(
    new Strategy(
      { usernameField: "email", passwordField: "password" },
      async (email, password, done) => {
        try {
          const user = await validateUser(email, password);

          if (!user) {
            return done(null, false, {
              message: "아이디, 비밀번호를 확인해주세요.",
            });
          }

          return done(null, user);
        } catch (err) {
          console.error(err);

          return done(err);
        }
      }
    )
  );
};

export default localStrategy;
