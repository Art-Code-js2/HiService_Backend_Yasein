`use strict`;
module.exports = companyTable = (sequelize, DataTypes) =>
  sequelize.define("company", {
    companyName: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    services: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      defaultValue: [],
    },
    owner: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    location: {
      type: DataTypes.STRING,
    },
    commercialRegister: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

module.exports = companyTable;
