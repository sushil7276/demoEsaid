const express = require("express");
// dotenv file configuration
require("dotenv").config({ path: "backend/config/config.env" });

const cookieParser = require("cookie-parser");
const cors = require("cors");

const app = express();

// using middleware
app.use(express.json()); // Response convert to json
app.use(express.urlencoded({ extended: true })); // file size
app.use(cookieParser()); // handle cookies

// access in frontend
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

module.exports = app;
