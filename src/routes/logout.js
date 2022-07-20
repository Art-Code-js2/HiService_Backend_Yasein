const logoutRouter = require("express").Router();
// const passport = require("passport");
// const { signInUsers } = require("../models-connections");
// const CLIENT_URL = "http://localhost:3000/";

// router.get("/login/success", async (req, res) => {
//   if (req.user) {
//     let logs = await signInUsers.create({
//       title: `user ${req.user.displayName} logged in`,
//       name: req.user.displayName,
//       email: "-",
//       role: "user",
//       method: "social",
//       date: new Date().toJSON(),
//     });
//     res.status(200).json({
//       success: true,
//       message: "successfull",
//       user: req.user,
//       //   cookies: req.cookies
//     });
//   }
// });

// router.get("/login/failed", (req, res) => {
//   res.status(401).json({
//     success: false,
//     message: "failure",
//   });
// });

logoutRouter.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/");
});

// router.get("/google", passport.authenticate("google", { scope: ["profile"] }));

// router.get(
//   "/google/callback",
//   passport.authenticate("google", {
//     successRedirect: CLIENT_URL,
//     failureRedirect: "/login/failed",
//   })
// );

// router.get("/github", passport.authenticate("github", { scope: ["profile"] }));

// router.get(
//   "/github/callback",
//   passport.authenticate("github", {
//     successRedirect: CLIENT_URL,
//     failureRedirect: "/login/failed",
//   })
// );

// router.get("/facebook", passport.authenticate("facebook", { scope: ["profile"] }));

// router.get(
//   "/facebook/callback",
//   passport.authenticate("facebook", {
//     successRedirect: CLIENT_URL,
//     failureRedirect: "/login/failed",
//   })
// );

module.exports = logoutRouter;