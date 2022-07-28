const logoutRouter = require("express").Router();

// logoutRouter.use("express-session");

logoutRouter.post("/logout", function (req, res) {
  req.session.destroy(() => {
    req.logOut();
    res.redirect("/");
  });

  req.session = null;
});
module.exports = logoutRouter;
