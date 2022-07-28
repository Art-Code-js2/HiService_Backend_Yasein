"use strict";

require("dotenv").config();
const { users } = require("../models/users");

module.exports = async (req, res, next) => {
  try {
    if (!req.headers.authorization) {
      next("Invalid header bearer Login");
    }

    const token = req.headers.authorization.split(" ").pop();
    req.user = await users.authenticateToken(token);
    next();
  } catch (error) {
    console.error(error);
    res.status(403).send("Invalid Login or Access Denied");
  }
};
