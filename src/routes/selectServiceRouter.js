"use strict";
require("dotenv").config();
const express = require("express");
const selectService = express.Router();
const fetch = require("node-fetch");

selectService.post("/selectservice", async (req, res, next) => {
  const notification = {
    title: "Title of notification",
    text: "Subtitle",
  };

  const fcm_tokens = [];

  const notification_body = {
    notification: notification,
    notification_body: fcm_tokens,
  };

  fetch("https://fcm.googleapis.com/fcm/send", {
    method: "post",
    header: {
      Authorization: "key=" + "",
    },
    body: JSON.stringify(notification_body),
  })
    .then(() => {
      res.status(200).send("Notification send successfully");
    })
    .catch((error) => {
      res.status(200).send("Something went wrong");
    });
});

module.exports = selectService;
