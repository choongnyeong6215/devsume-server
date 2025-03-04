import dotenv from "dotenv";
dotenv.config({ path: "src/config/.env" });

import express from "express";
import connectDb from "./config/db.ts";

const app = express();
const PORT = process.env.PORT;

// console.log();
// db connection
connectDb();

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
