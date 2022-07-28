`use strict`;
const express = require("express");
const companyRouter = express.Router();
const { company } = require("../../models/index.models");
const bearer = require("../../middleware/bearer");

companyRouter.get("/company", handleGetAll);

async function handleGetAll(req, res) {
  let allRecords = await company.findAll();
  res.status(200).json(allRecords);
}

module.exports = companyRouter;
