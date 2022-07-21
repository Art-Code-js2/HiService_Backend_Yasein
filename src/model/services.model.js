"use strict";

const servicesModels = (sequelize, DataTypes) =>
  sequelize.define("services", {
    departments: {
      type: DataTypes.STRING,
      allowNull: false,
      required: true,
    },
    nameProfession: {
      type: DataTypes.STRING,
      allowNull: false,
      required: true,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false,
      required: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
      required: true,
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false,
      required: true,
    },
    phoneNumber: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    userID: {
      type: DataTypes.INTEGER,
    },
  });

module.exports = servicesModels;
