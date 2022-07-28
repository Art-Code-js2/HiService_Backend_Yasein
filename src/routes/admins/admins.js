"use strict";
const express = require("express");
const usersRouter = express.Router();
const { users } = require("../../models/users");
const bearer = require("../../middleware/bearer");
const acl = require("../../middleware/acl");
const bcrypt = require("bcrypt");

usersRouter.get("/admin", bearer, acl("delete"), handleGetAll);
usersRouter.get("/admin/:id", bearer, acl("delete"), handleGetOne);
usersRouter.post("/admin", bearer, acl("delete"), handleCreate);
usersRouter.put("/admin/:id", bearer, acl("delete"), handleUpdate);
usersRouter.delete("/admin/:id", bearer, acl("delete"), handleDelete);

async function handleGetAll(req, res) {
  if (req.user.role === "admin") {
    const userRecords = await users.findAll({});
    const usersList = userRecords.map((user) => user);
    res.status(200).json(usersList);
  } else {
    res.send("Access denied");
  }
}

async function handleGetOne(req, res) {
  if (req.user.role === "admin") {
    let userId = parseInt(req.params.id);
    let findOne = await users.findOne({ where: { id: userId } });
    res.status(200).json(findOne);
  } else {
    res.send("Access denied");
  }
}

async function handleCreate(req, res, next) {
  try {
    if (req.user.role === "admin") {
      const record = await users.create({
        username: req.body.username,
        password: await bcrypt.hash(req.body.password, 10),
        role: req.body.role,
      });

      res.status(201).json(record);
    } else {
      res.send("Access denied");
    }
  } catch (err) {
    console.log(err);
    next(err);
  }
}

async function handleUpdate(req, res) {
  if (req.user.role === "admin") {
    let userId = parseInt(req.params.id);
    let foundUser = await users.findOne({ where: { id: userId } });

    if (foundUser) {
      const record = await foundUser.update({
        username: req.body.username,
        password: await bcrypt.hash(req.body.password, 10),
        role: req.body.role,
      });

      res.status(201).json("Update Successfully");
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } else {
    res.send("Access denied");
  }
}

async function handleDelete(req, res) {
  try {
    if (req.user.role === "admin") {
      let userId = parseInt(req.params.id);
      let foundUser = await users.findOne({ where: { id: userId } });
      if (foundUser) {
        let deletedRecord = await users.destroy({ where: { id: userId } });
        res.status(204).json({ message: "Deleted successfully" });
      } else {
        res.status(404).json({ message: "User not found" });
      }
    } else {
      res.send("Access denied");
    }
  } catch (err) {
    console.log(err);
    next(err);
  }
}

module.exports = usersRouter;
