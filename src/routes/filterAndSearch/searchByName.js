"use strict";

const express = require("express");
const searchRouter = express.Router();
const bearer = require("../../middleware/bearer");
const { service } = require("../../models/index.models");

searchRouter.post("/searchbyname", bearer, async (req, res) => {
  try {
    const { searchTerm } = req.body;

    const records = await service.searchService(searchTerm);
    console.log({ records });
    res.status(201).json(records);
  } catch (err) {
    console.log(err);
  }
});

module.exports = searchRouter;
