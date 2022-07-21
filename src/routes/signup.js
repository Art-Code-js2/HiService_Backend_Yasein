"use strict";
const express = require("express");
const signUpRouter = express.Router();

const { Users } = require("../model/index.model");
const bcrypt = require("bcrypt");

signUpRouter.post("/signup", async (req, res, next) => {
  try {
    const record = await Users.create({
      username: req.body.username,
      password: await bcrypt.hash(req.body.password, 10),
      role: req.body.role,
    });

    res.status(201).json(record);
    next();
  } catch (err) {
    console.log(err);
    next(err);
  }
});

module.exports = signUpRouter;
