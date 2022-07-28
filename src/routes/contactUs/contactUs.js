"use strict";
const express = require("express");

const { contactUs } = require("../../models/index.models");
const bearer = require("../../middleware/bearer");

const contactRouter = express.Router();

contactRouter.post("/contactus", bearer, async (req, res) => {
  try {
    const createContactUs = await contactUs.create({
      username: req.body.username,
      email: req.body.email,
      description: req.body.description,
    });

    res.status(201).json(createContactUs);
  } catch (err) {
    console.log(err);
    res.status(404).send(err);
  }
});

// only the admin can get all records
contactRouter.get("/contactus", bearer, async (req, res) => {
  if (req.user.role === "admin") {
    res.status(200).json(await contactUs.findAll());
  } else {
    res.status(404).send("access denied");
  }
});

module.exports = contactRouter;
