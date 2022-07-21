"use strict";
const base64 = require("base-64");
const { Users } = require("../model/index.model");

module.exports = async (req, res, next) => {
  if (!req.headers.authorization) {
    next();
    return _authError();
  }

  let basic = req.headers.authorization.split(" ").pop();

  let [username, pass] = base64.decode(basic).split(":");

  try {
    req.user = await Users.authenticateBasic(username, pass);
    next();
  } catch (e) {
    console.error(e);
    res.status(403).send("Username or Password is wrong");
  }
};
