"use strict";

const favoritesModel = (sequelize, DataTypes) =>
  sequelize.define("favorites", {
    itemName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    itemImg: {
      type: DataTypes.STRING,
    },
    itemDescription: {
      type: DataTypes.STRING(1000),
    },
    itemPrice: {
      type: DataTypes.INTEGER,
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
  });
module.exports = favoritesModel;
