"use strict";

const reportModel = (sequelize, DataTypes) =>
  sequelize.define("report", {
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM("confirm", "reject"),
      allowNull: false,
    },
    userID: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    serviceID: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });

module.exports = reportModel;
