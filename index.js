"use strict";
require("dotenv").config();
const server = require("./src/server");
const { db } = require("./src/models/index.models");

// db.sync({ force: true }).then(() => {
db.sync().then(() => {
  server.start();
});
