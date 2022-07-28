"use strict";

const bcrypt = require("bcrypt");
const { users } = require("../../models/index.models");
const express = require("express");
const signUpRouter = express.Router();
const { companyForm } = require("../companyUsers/signupCompany");
const mail = require("../mails/mail");

signUpRouter.post("/signup", async (req, res) => {
  try {
    const { role, email, username, city, gender, birthday, phoneNumber, professions, password, companyOrUser } = req.body;
    const passwordHash = await bcrypt.hash(password, 10);

    // add email
    const record = await users.create({ username: username, password: passwordHash, role: role, companyOrUser: companyOrUser, email: email, city: city, gender: gender, birthday: birthday, phoneNumber: phoneNumber, professions: professions });
    console.log({ record });

    mail(req.body.email);
    res.status(201).json(record);
    if (req.body.companyOrUser === "company") {
      // res.redirect("/signup/company")
      companyForm();
    }

    res.status(201).json(record);
  } catch (err) {
    console.log(err);
  }
});

module.exports = signUpRouter;
