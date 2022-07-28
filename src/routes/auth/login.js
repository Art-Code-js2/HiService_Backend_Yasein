"use strict";
const express = require("express");
const loginRouters = express.Router();
const basic = require("../../middleware/basic");
const isBlocked = require("../../middleware/isBlocked");

loginRouters.post("/login", basic, isBlocked, (req, res) => {
  res.status(200).json(req.user);
});

module.exports = loginRouters;
