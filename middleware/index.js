// all the middleware goes here
var middlewareObj = {};
var user = require("../models/user");
var jwt = require("jsonwebtoken");


//Middleware to check if user is loggedin
middlewareObj.isLoggedIn = function (req, res, next) {
  if (req.isAuthenticated()) {
    //when user is checked function call next()
    return next();
  }
  else
    req.flash("error", "Please login first !");
  res.redirect("/login");
};

//Middleware for checking token
middlewareObj.checkToken = function (req, res, next) {
  const bearerHeader = req.headers["authorization"];
  if (typeof bearerHeader !== 'undefined') {
    const bearer = bearerHeader.split(" ");
    const bearerToken = bearer[1];
    req.token = bearerToken;
    next();
  }
  else {
    res.sendStatus(403);
  }
}



module.exports = middlewareObj;
