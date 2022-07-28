"use strict";

const express = require("express");
const myServicesRouter = express.Router();
const { service } = require("../../models/index.models");
const bearer = require("../../middleware/bearer");

myServicesRouter.get("/myServices", bearer, handelMyServices);

async function handelMyServices(req, res) {
  //   const token = req.user.id;

  const myServices = await service.findAll({ where: { userID: req.user.id } });

  res.status(200).send(myServices);
}

module.exports = myServicesRouter;
