"use strict";
const contactModel = (sequelize, DataTypes) =>
  sequelize.define("contact", {
    username: {
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
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });

module.exports = contactModel;
