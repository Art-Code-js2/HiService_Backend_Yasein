"use strict";

require("dotenv").config();
const PORT = process.env.PORT || 3000;
const logger = require("./middleware/logger");

// express app
const express = require("express");
const app = express();
app.use(express.json());
app.use(logger);

// Home Page
const homeRouters = require("./routes/homePage/homePage");
app.use(homeRouters);

// Admins Models Routers
const usersRouter = require("./routes/admins/admins");
app.use("/auth", usersRouter);

// Sign up page
const signUpRouter = require("./routes/auth/signup");
app.use(signUpRouter);

// login page
app.get("/login", (req, res) => {
  res.sendFile(__dirname + "/login.html");
});
const loginRouter = require("./routes/auth/login");
app.use(loginRouter);

// All Models Routers
const router = require("./routes/routes");
app.use(router);

// Contact Us Page
const contactUs = require("./routes/contactUs/contactUs");
app.use(contactUs);

// Payment
const paymentRouter = require("./routes/payment/payment");
app.use(paymentRouter);

// Services Routes
const services = require("./routes/services/services");
app.use(services);

// Search By Name
const SearchByName = require("./routes/filterAndSearch/searchByName");
app.use(SearchByName);

// Filter By Most Rated
const mostRated = require("./routes/filterAndSearch/mostRated");
app.use(mostRated);

// Filter By Most Last New Service
const lastNews = require("./routes/filterAndSearch/lastNewServices");
app.use(lastNews);

// Filter By Department
const department = require("./routes/filterAndSearch/department");
app.use(department);

// About Us
const aboutUs = require("./routes/aboutUs/aboutUs");
app.use(aboutUs);

// Discounts
const discount = require("./routes/discount/discount");
app.use(discount);

// Delete Profile Router
const deleteProfileRouter = require("./routes/users/deleteProfile");
app.use(deleteProfileRouter);

// Signup Company
const signupCompany = require("./routes/companyUsers/signupCompany");
app.use(signupCompany);

// Company Routes
const companyRoutes = require("./routes/companyUsers/companyRoutes");
app.use(companyRoutes);

// facebook
const facebook = require("./routes/facebook/facebook");
app.use(facebook);

// facebook
const MyServicesRouter = require("./routes/users/myServices");
app.use(MyServicesRouter);

// google
const google = require("./routes/google/google");
app.use(google);

//User Block Routers
const blockUserRouter = require("./routes/block/block.users");
app.use(blockUserRouter);

//Admin Block Routers
const blockAdminRouter = require("./routes/block/block.admin");
app.use(blockAdminRouter);

// Error not Found Handler
const notFoundHandler = require("./errorHandlers/404");
app.use("*", notFoundHandler);

// Error Handler
const errorHandler = require("./errorHandlers/500");
app.use(errorHandler);

// App connection
function start() {
  app.listen(PORT, () => {
    console.log(`Listen and Running on port ${PORT}`);
  });
}

// Export app and start function for the connection and sync the information
module.exports = {
  app: app,
  start: start,
};
