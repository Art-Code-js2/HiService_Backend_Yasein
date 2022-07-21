"use strict";

require("dotenv").config();
const { Users } = require("../model/index.model");

module.exports = async (req, res, next) => {
  console.log(req.headers.authorization);
  try {
    if (!req.headers.authorization) next("Invalid header bearer Login");

    const token = req.headers.authorization.split(" ").pop();

    req.user = await Users.authenticateToken(token);

    next();
  } catch (e) {
    console.error(e);
    res.status(403).send("Invalid Login or Access Denied");
  }
};
