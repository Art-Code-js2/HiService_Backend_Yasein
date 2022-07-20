"use strict";
const express = require("express");
const getUsersRouter = express.Router();
const { Users } = require("../model/index.model");
const bearer = require("../middleware/bearer");

getUsersRouter.get("/users", bearer, async (req, res, next) => {
  const userRecords = await Users.findAll({});
  const list = userRecords.map((user) => user.username);

  res.status(200).json({
    message: "You are authorized to view the user orders",
    user: req.user,
    list,
  });
});

module.exports = getUsersRouter;
