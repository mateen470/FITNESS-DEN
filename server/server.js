import express from "express";
import dotenv from "dotenv";
import("./database/connection.js")

dotenv.config();
const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.json("SERVER STARTED");
});

app.listen(PORT, () => {
  console.log(`APP IS RUNNING ON http://localhost:${PORT}`);
});
