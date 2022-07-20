"use strict";
require("dotenv").config();
const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

const notFoundHandler = require("./handlers/404");
const errorHandler = require("./handlers/500");

app.get("/", handleHome);
const signInRouter = require("./routes/signin");
const signUpRouter = require("./routes/signup");
const logoutRouter = require("./routes/logout");
const getUsersRouters = require("./routes/allUsers");
const router = require("./routes/router");

app.use(express.json());
app.use(signInRouter);
app.use(signUpRouter);
app.use(logoutRouter);
app.use(getUsersRouters);
app.use(router);

function handleHome(req, res) {
  res.send("welcome to heroku auth-api server");
}

app.use("*", notFoundHandler);
app.use(errorHandler);

function start() {
  app.listen(PORT, () => {
    console.log(`Listen and Running on port ${PORT}`);
  });
}

module.exports = {
  app: app,
  start: start,
};
