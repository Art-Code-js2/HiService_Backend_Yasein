"use strict";

const { Op } = require("sequelize");

const servicesModel = (sequelize, DataTypes) => {
  const model = sequelize.define("services", {
    department: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phoneNumber: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    discount: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: true,
    },
    reportsCounter: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    userID: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  });

  // search by name profession
  model.searchService = async function (searchTerm) {
    const users = await model.findAll({
      where: {
        title: { [Op.like]: "%" + searchTerm + "%" },
      },
    });

    return users;
  };
  return model;
};
module.exports = servicesModel;
