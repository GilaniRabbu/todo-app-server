import express from "express";
import dotenv from "dotenv";
import connectBD from "./db/database.js";

const app = express();
dotenv.config();
connectBD();

app.get("/", (req, res) => {
  res.send("<h1>Hello, World!</h1>");
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
