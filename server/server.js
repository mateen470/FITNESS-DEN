const express = require("express");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");
const cors = require("cors");
require("./database/connection");
const router = require("./router/authroutes");

dotenv.config();
const PORT = process.env.PORT || 5000;

const app = express();

const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true,
};

app.options("*", cors(corsOptions));
app.use(cors(corsOptions));

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  next();
});

app.use(express.json());
app.use(cookieParser());
app.use("/fitness-den", router);

app.get("/", (req, res) => {
  res.json("SERVER STARTED");
});

app.listen(PORT, () => {
  console.log(`APP IS RUNNING ON http://localhost:${PORT}`);
});
