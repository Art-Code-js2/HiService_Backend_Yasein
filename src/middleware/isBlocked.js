"use strict";

const { users } = require("../models/index.models");

module.exports = async (req, res, next) => {
  try {
    const ID = req.user.id;
    const findUser = await users.findOne({ where: { id: ID } });

    if (findUser.blocked === false) {
      next();
      return;
    }
    res.status(404).send("You are blocked please contact with customer service !!");
  } catch (error) {
    console.log(error);
    res.status(403).send("Blocked Error");
  }
};
