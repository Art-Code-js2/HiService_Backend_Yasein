"use strict";

require("dotenv").config();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const SECRET = process.env.API_SECRET || "yasein";

const UserModel = (sequelize, DataTypes) => {
  const model = sequelize.define("users", {
    username: {
      type: DataTypes.STRING,
      required: true,
      allowNull: false,
      unique: true,
    },
    // gender: {
    //   type: DataTypes.STRING,
    //   allowNull: false,
    // },
    // city: {
    //   type: DataTypes.STRING,
    //   allowNull: false,
    // },
    // birthday: {
    //   type: DataTypes.STRING,
    //   allowNull: false,
    // },
    // phoneNumber: {
    //   type: DataTypes.STRING,
    //   allowNull: false,
    //   unique: false,
    // },
    // email: {
    //   type: DataTypes.STRING,
    //   allowNull: false,
    //   unique: true,
    // },
    password: {
      type: DataTypes.STRING,
      required: true,
      allowNull: false,
    },
    role: { type: DataTypes.ENUM("user", "writer", "editor", "admin"), defaultValue: "user" },
    token: {
      type: DataTypes.VIRTUAL,
      get() {
        return jwt.sign({ username: this.username }, SECRET);
      },
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
  });

  model.beforeCreate = async function (user) {
    let hashedPass = await bcrypt.hash(user.password, 10);
    return hashedPass;
  };

  // Basic
  model.authenticateBasic = async function (username, password) {
    const user = await this.findOne({ where: { username: username } });
    const valid = await bcrypt.compare(password, user.password);

    if (!valid) {
      console.log("hi");
      return user;
    }
    throw new Error("Invalid User");
  };

  // Bearer
  model.authenticateBearer = async function (token) {
    try {
      const parsedToken = jwt.verify(token, SECRET);
      const user = this.findOne({ where: { username: parsedToken.username } });

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

module.exports = UserModel;
