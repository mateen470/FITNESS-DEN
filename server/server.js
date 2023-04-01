const express = require("express");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");
require("./database/connection");
const router = require("./router/authroutes");

dotenv.config();
const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use("/fitness-den", router);

app.get("/", (req, res) => {
  res.json("SERVER STARTED");
});

app.listen(PORT, () => {
  console.log(`APP IS RUNNING ON http://localhost:${PORT}`);
});
