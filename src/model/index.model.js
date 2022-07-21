"use strict";
require("dotenv").config();

const Collection = require("./collection");
const { Sequelize, DataTypes } = require("sequelize");

const UserModel = require("./user.model");
const contactModel = require("./contact.model");
const feedbackModel = require("./feedback.model");
const interactionsModel = require("./interactions.models");
const servicesModel = require("./services.model");

const POSTGRES_URI = process.env.NODE_ENV === "test" ? "sqlite:memory:" : process.env.DATABASE_URL;

let sequelizeOptions =
  process.env.NODE_ENV === "production"
    ? {
        dialectOptions: {
          ssl: { require: true, rejectUnauthorized: false },
        },
      }
    : {};

let sequelize = new Sequelize(POSTGRES_URI, sequelizeOptions);
const userTable = UserModel(sequelize, DataTypes);
// const userCollection = new Collection(userTable);

const contactTable = contactModel(sequelize, DataTypes);
const contactCollection = new Collection(contactTable);

const feedbackTable = feedbackModel(sequelize, DataTypes);
const feedbackCollection = new Collection(feedbackTable);

const interactionsTable = interactionsModel(sequelize, DataTypes);
const interactionsCollection = new Collection(interactionsTable);

const servicesTable = servicesModel(sequelize, DataTypes);
const servicesCollection = new Collection(servicesTable);

//....relationships one to many........

// contact
userTable.hasMany(contactTable, {
  foreignKey: "userId",
  sourceKey: "id",
});
contactTable.belongsTo(userTable, {
  foreignKey: "userId",
  targetKey: "id",
});

// service
userTable.hasMany(servicesTable, {
  foreignKey: "userId",
  sourceKey: "id",
});
servicesTable.belongsTo(userTable, {
  foreignKey: "userId",
  targetKey: "id",
});

// interactions
userTable.hasMany(interactionsTable, {
  foreignKey: "userId",
  sourceKey: "id",
});
interactionsTable.belongsTo(userTable, {
  foreignKey: "userId",
  targetKey: "id",
});

// feedback
userTable.hasMany(feedbackTable, {
  foreignKey: "userId",
  sourceKey: "id",
});
feedbackTable.belongsTo(userTable, {
  foreignKey: "userId",
  targetKey: "id",
});

module.exports = {
  db: sequelize,
  Users: userTable,

  contact: contactCollection,
  feedback: feedbackCollection,
  interactions: interactionsCollection,
  services: servicesCollection,
};
