"use strict";

const feedbackModels = (sequelize, DataTypes) =>
  sequelize.define("feedback", {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      required: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      required: true,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
      required: true,
    },
    userID: {
      type: DataTypes.INTEGER,
    },
  });
module.exports = feedbackModels;
