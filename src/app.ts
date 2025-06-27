import dotenv from "dotenv";
dotenv.config({ path: "src/config/.env" });

import express from "express";
import connectDb from "./config/db.ts";
import userRouter from "./routes/user.route.ts";
import resumeRouter from "./routes/resume.route.ts";
import * as errorMiddleware from "./middleware/error.middleware.ts";
import passport from "passport";
import localStrategy from "./strategies/local.strategy.ts";
import kakaoStrategy from "./strategies/kakao.strategy.ts";
import cors from "cors";
import { corsOptions } from "./config/cors.ts";
import cookieParser from "cookie-parser";

const app = express();
const PORT = process.env.PORT;

// cors
app.use(cors(corsOptions));

// cookie
app.use(cookieParser());

// db connection
connectDb();

// passport stragtegy
localStrategy();
kakaoStrategy();

// common middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// passport
app.use(passport.initialize());

// end point
app.use("/users", userRouter);
app.use("/resumes", resumeRouter);

// error middleware
app.use(errorMiddleware.errorHandler);

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
