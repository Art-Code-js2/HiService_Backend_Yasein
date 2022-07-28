"use strict";

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const userModel = (sequelize, DataTypes) => {
  const model = sequelize.define("users", {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    gender: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    birthday: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    phoneNumber: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    professions: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    facebookId: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    didPay: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    googleId: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    usersBlockList: {
      type: DataTypes.ARRAY(DataTypes.INTEGER),
      defaultValue: [],
    },
    blocked: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    companyOrUser: {
      type: DataTypes.ENUM("company", "user"),
      defaultValue: "user",
    },
    role: {
      type: DataTypes.ENUM("admin ", "writer", "editor", "user"),
      defaultValue: "user",
    },
    actions: {
      type: DataTypes.VIRTUAL,
      get() {
        const acl = {
          user: ["read"],
          writer: ["read", "create"],
          editor: ["read", "create", "update"],
          admin: ["read", "create", "update", "delete"],
        };
        return acl[this.role];
      },
    },
    token: {
      type: DataTypes.VIRTUAL,
      get() {
        return jwt.sign({ username: this.username }, process.env.SECRET);
      },
    },
  });

  // Hash Password
  model.beforeCreate = async function (user) {
    let hashedPass = await bcrypt.hash(user.password, 10);
    return hashedPass;
  };

  // Basic Authenticate
  model.authenticateBasic = async function (username, password) {
    try {
      const user = await model.findOne({ where: { username: username } });
      const valid = await bcrypt.compare(password, user.password);

      if (valid) {
        return user;
      }
      throw new Error("Invalid User");
    } catch (e) {
      throw new Error(e.message);
    }
  };

  // Bearer Authenticate
  model.authenticateToken = async function (token) {
    try {
      const parsedToken = jwt.verify(token, process.env.SECRET);
      const user = await this.findOne({ where: { username: parsedToken.username } });

      if (user) {
        return user;
      }
      throw new Error("User Not Found");
    } catch (e) {
      throw new Error(e.message);
    }
  };

  return model;
};

module.exports = userModel;
