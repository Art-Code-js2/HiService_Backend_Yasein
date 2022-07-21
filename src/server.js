"use strict";

require("dotenv").config();
const PORT = process.env.PORT || 3000;

// express app
const express = require("express");
const app = express();
app.use(express.json());

// Home Page
const homeRouters = require("./routes/homePage");
app.use(homeRouters);

// Sign up page
const signUpRouter = require("./routes/signup");
app.use(signUpRouter);

// Sign in page
const signInRouter = require("./routes/signin");
app.use(signInRouter);

// Users Models Routers
const usersRouter = require("./routes/usersRouters");
app.use("/auth", usersRouter);

// Models Routers
const router = require("./routes/router");
app.use(router);

// Error not Found Handler
const notFoundHandler = require("./handlers/404");
app.use("*", notFoundHandler);

// Error Handler
const errorHandler = require("./handlers/500");
app.use(errorHandler);

// App connection
function start() {
  app.listen(PORT, () => {
    console.log(`Listen and Running on port ${PORT}`);
  });
}

// Export app and start function for the connection and sync the information
module.exports = {
  app: app,
  start: start,
};
