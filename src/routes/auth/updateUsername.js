"use strict";

// update password and username
const express = require("express");
const updateUsername = express.Router();
const { users } = require("../../models/users");
const bearer = require("../../middleware/bearer");
const { users } = require("../../models/index.models");

// change username
updateUsername.post("/updateusername", bearer, async (req, res, next) => {
  let tokenId = req.user.id;
  let role = req.user.role;

  try {
    let ID = parseInt(req.params.id);

    const username = req.body.username;

    const found = await users.findOne({ where: { id: ID } });

    if ((found && tokenId === ID) || (role == "admin" && found)) {
      if (req.body.username) {
        let updates = await found.update({
          username: username,
        });
        res.status(201).send({
          status: "Update username successfully!",
          "username updated to": updates.username,
        });
        next();
      } else {
        res.status(404).send("Enter username !");
      }
    } else {
      res.status(404).send("Access denied!");
    }
  } catch (e) {
    res.status(500).send("error update");
  }
});

module.exports = updateUsername;
