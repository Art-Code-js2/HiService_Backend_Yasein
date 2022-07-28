"use strict";
const bcrypt = require("bcrypt");
const  company  = require("../../models/index.models");
const express = require("express");
const companyFormRouter = express.Router();

companyFormRouter.post("/signup/company", async (req, res) => {
  try {
    const { companyName, email, password, services, owner, phoneNumber, city, location, commercialRegister } = req.body;
    const passwordHash = await bcrypt.hash(password, 10);
    const record = await company.create({ companyName: companyName, password: passwordHash, services: services, email: email, city: city, owner: owner, location: location, phoneNumber: phoneNumber, commercialRegister: commercialRegister });
    console.log({ record });
    res.status(201).json(record);
  } catch (err) {
    console.log(err);
  }
});

module.exports = companyFormRouter;
