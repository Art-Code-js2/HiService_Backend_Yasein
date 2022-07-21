"use strict";
require("dotenv").config();
const express = require("express");
const homeRouters = express();

const logger = require("../middleware/logger");
homeRouters.use(logger);

homeRouters.get("/", (req, res) => {
  res.send("welcome to HiService server");
});

module.exports = homeRouters;
