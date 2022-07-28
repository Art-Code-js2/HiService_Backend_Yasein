"use strict";

//Access Control List ( ACL )
module.exports = (roleActions) => {
  return (req, res, next) => {
    try {
      if (req.user.actions.includes(roleActions)) {
        next();
      } else {
        next("Access Denied");
      }
    } catch (e) {
      next("Invalid Login");
    }
  };
};
