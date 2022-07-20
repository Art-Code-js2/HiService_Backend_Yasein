"use strict";
const contactModel = (sequelize, DataTypes) =>
  sequelize.define("contact", {
    userName: {
      type: DataTypes.STRING,
      required: true,
    },
    phoneNumber: {
      type: DataTypes.STRING,
      required: true,
    },
    email: {
      type: DataTypes.STRING,
      required: true,
    },
    message: {
      type: DataTypes.STRING,
      required: true,
    },
  });

module.exports = contactModel;
