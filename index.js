// Documentation
// In this code, we first import the necessary modules: `express` for creating the server, `dotenv` for managing environment variables, and `connectBD` for connecting to the MongoDB database.

import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import connectBD from "./db/database.js";
import userRouter from "./routes/user.js";

const app = express();
dotenv.config();
connectBD();

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api/v1/user", userRouter);

app.get("/", (req, res) => {
  res.send("<h1>Hello, World!</h1>");
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});