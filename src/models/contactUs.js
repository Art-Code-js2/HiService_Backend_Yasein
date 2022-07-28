'use strict';

const contactUsModel = (sequelize, DataTypes) =>
  sequelize.define("contactUs", {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
module.exports = contactUsModel;