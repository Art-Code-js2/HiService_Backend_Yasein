'use strict';

const interactionsModel = (sequelize, DataTypes) =>
  sequelize.define("interactions", {
    addToFavorite: {
      type: DataTypes.STRING,
      required: false,
    },
    comments: {
      type: DataTypes.STRING,
      allowNull: false,
      required: false,
    },
    rate: {
      type: DataTypes.STRING,
      required: false,
    },
    userID: {
      type: DataTypes.INTEGER,
    },
  });

module.exports = interactionsModel;