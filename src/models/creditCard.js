"use strict";

const paymentModel = (sequelize, DataTypes) =>
  sequelize.define("paymentInfo", {
    cardNumber: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    cvv: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    expirationDate: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    balance: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });

module.exports = paymentModel;
