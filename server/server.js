const express = require("express");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");
const cors = require("cors");
require("./database/connection");
const router = require("./router/authroutes");

dotenv.config();
const PORT = process.env.PORT || 5000;

const app = express();

app.use(
  cors((req, callback) => {
    const allowedOrigins = ["http://localhost:3000"];
    const origin = req.headers.origin;

    if (allowedOrigins.includes(origin)) {
      callback(null, { origin: true, credentials: true });
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  })
);

app.use(express.json());
app.use(cookieParser());
app.use("/fitness-den", router);

app.get("/", (req, res) => {
  res.json("SERVER STARTED");
});

app.listen(PORT, () => {
  console.log(`APP IS RUNNING ON http://localhost:${PORT}`);
});
