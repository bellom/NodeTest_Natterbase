// all the middleware goes here
var camp = require("../models/campground");
var middlewareObj = {};



middlewareObj.isLoggedIn = function (req, res, next) {
  if (req.isAuthenticated()) {
    //when user is checked function call next()
    return next();
  }
  else
    req.flash("error", "Please login first !");
  res.redirect("/login");
};


module.exports = middlewareObj;
