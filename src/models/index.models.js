"use strict";
require("dotenv").config();

const Collection = require("./collection");
const { Sequelize, DataTypes } = require("sequelize");

// Tables
const usersModel = require("./users");
const contactUsModel = require("./contactus");
const serviceModel = require("./services");
const interactionsModel = require("./interactions");
const paymentModel = require("./credit card");
const companyModel = require("./company");
const reservationModel = require("./Reservation");
const reportModel = require("./report");

// Sequelize connection
const POSTGRES_URI = process.env.NODE_ENV === "test" ? "sqlite:memory:" : process.env.DATABASE_URL;

let sequelizeOptions =
  process.env.NODE_ENV === "production"
    ? {
        dialectOptions: {
          ssl: {
            require: true,
            rejectUnauthorized: false,
          },
        },
      }
    : {};

let sequelize = new Sequelize(POSTGRES_URI, sequelizeOptions);
const userTable = UserModel(sequelize, DataTypes);

// CRUD Collection

const reportTable = reportModel(sequelize, DataTypes);
const reportCollection = new Collection(reportTable);

const companyTable = companyModel(sequelize, DataTypes);
const companyCollection = new Collection(companyTable);

const paymentTable = paymentModel(sequelize, DataTypes);
const paymentCollection = new Collection(paymentTable);

const contactTable = contactModel(sequelize, DataTypes);
const contactCollection = new Collection(contactTable);

const servicesTable = servicesModel(sequelize, DataTypes);
const servicesCollection = new Collection(servicesTable);

const reservationTable = reservationModel(sequelize, DataTypes);
const reservationCollection = new Collection(reservationTable);

const interactionsTable = interactionsModel(sequelize, DataTypes);
const interactionsCollection = new Collection(interactionsTable);

//....relationships one to many........

// service
userTable.hasMany(servicesTable, {
  foreignKey: "userID",
  sourceKey: "id",
});
servicesTable.belongsTo(userTable, {
  foreignKey: "userID",
  targetKey: "id",
});

// interactions
userTable.hasMany(interactionsTable, {
  foreignKey: "userID",
  sourceKey: "id",
});
interactionsTable.belongsTo(userTable, {
  foreignKey: "userID",
  targetKey: "id",
});

// relations between service and interactions
servicesTable.hasMany(interactionsTable, {
  foreignKey: "serviceID",
  targetKey: "id",
});
interactionsTable.belongsTo(servicesTable, {
  foreignKey: "serviceID",
  targetKey: "id",
});

// relation between reservation and users
userTable.hasMany(reservationTable, {
  foreignKey: "userID",
  targetKey: "id",
});
reservationTable.belongsTo(userTable, {
  foreignKey: "userID",
  targetKey: "id",
});

// relation between reservation and services
servicesTable.hasMany(reservationTable, {
  foreignKey: "serviceID",
  targetKey: "id",
});
reservationTable.belongsTo(servicesTable, {
  foreignKey: "serviceID",
  targetKey: "id",
});

// relation between report and userID and ServiceID
userTable.hasMany(reportTable, {
  foreignKey: "userID",
  targetKey: "id",
});
reportTable.belongsTo(userTable, {
  foreignKey: "userID",
  targetKey: "id",
});

// relation between report and service and report
servicesTable.hasMany(reportTable, {
  foreignKey: "serviceID",
  targetKey: "id",
});
reportTable.belongsTo(servicesTable, {
  foreignKey: "serviceID",
  targetKey: "id",
});

module.exports = {
  db: sequelize,
  users: userTable,

  report: reportCollection,
  contact: contactCollection,
  company: companyCollection,
  payment: paymentCollection,
  services: servicesCollection,
  reservation: reservationCollection,
  interactions: interactionsCollection,
};
