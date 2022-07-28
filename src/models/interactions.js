"use strict";

const interactionsModel = (sequelize, DataTypes) =>
  sequelize.define("interactions", {
    addToFavorite: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    comments: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    rate: {
      type: DataTypes.INTEGER,
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

module.exports = interactionsModel;
