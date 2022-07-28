"use strict";
const express = require("express");

const { service } = require("../../models/index.models");
const bearer = require("../../middleware/bearer");
const lastNewRouter = express.Router();

lastNewRouter.get("/lastnews", bearer, async (req, res) => {
  // create At : its mean the time that did user signup in website
  let allRecords = await service.findAll({ order: [["createdAt", "DESC"]] });
  res.status(200).json(allRecords);
});

module.exports = lastNewRouter;
