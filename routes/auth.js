var express = require("express");
var router = express.Router();
var passport = require("passport");
var user = require("../models/user");

//show register form
router.get("/register", function (req, res) {
  res.render("register");
})

//handle sign up logic
router.post("/register", function (req, res) {
  var newUser = new user({ username: req.body.username });
  user.register(newUser, req.body.password, function (err, user) {
    if (err) {
      console.log(err); //var message below gotten from err
      req.flash("error", err.message);
      return res.render("register");
    }
    passport.authenticate("local")(req, res, function () {
      req.flash("success", "Welcome to list countries " + user.username);
      res.redirect("/countries");
    });
  });
});

//show login form
router.get("/login", function (req, res) {
  res.render("login");
});

//handling login logic
//using MiddleWare - app.post("/login", middleware, callback function)
router.post("/login", passport.authenticate("local", {
  successRedirect: "/countries",
  failureRedirect: "/login",
  failureFlash: true
}));

//logout routes
router.get("/logout", function (req, res) {
  req.logout();
  req.flash("success", "Bye, you logged out!");
  res.redirect("/login");
});



module.exports = router;
