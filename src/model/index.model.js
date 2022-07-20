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

module.exports = {
  db: sequelize,
  Users: userTable,

  contact: contactCollection,
  feedback: feedbackCollection,
  interactions: interactionsCollection,
  services: servicesCollection,
};
