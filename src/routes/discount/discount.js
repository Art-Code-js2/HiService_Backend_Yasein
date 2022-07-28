"use strict";
const express = require("express");

const { service } = require("../../models/index.models");
const discountRouter = express.Router();

discountRouter.get("/discount", async (req, res) => {
  res.status(200).json(await service.findAll({ where: { discount: "true" } }));
});
module.exports = discountRouter;
