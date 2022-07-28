"use strict";

const express = require("express");
const mostRatedRouter = express.Router();

const { interactions } = require("../../models/index.models");
const bearer = require("../../middleware/bearer");

mostRatedRouter.get("/mostrated", bearer, async (req, res) => {
  let allRecords = await interactions.findAll({ order: [["rate", "DESC"]] });
  res.status(200).json(allRecords);
});
module.exports = mostRatedRouter;
