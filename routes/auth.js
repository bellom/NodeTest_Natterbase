var express = require("express");
var router = express.Router();
var passport = require("passport");
var user = require("../models/user");
var jwt = require("jsonwebtoken")
var middleware = require("../middleware");


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
      token: middleware.token;
      res.redirect("/countries");
    });
  });
});

//show login form
router.get("/login", function (req, res) {
  res.render("login");
});

router.post("/login", passport.authenticate("local"), function (req, res, next) {
  if (req.isAuthenticated()) {
    //creating token
    let token = jwt.sign({ username: req.user.username }, 'secret', { expiresIn: 120 });
    console.log(req.user.username)
    console.log(token);
    token: token;
    res.redirect("/countries");
  }
  else {
    res.redirect("/login");
    failureFlash: true;
  }
});


//logout routes
router.get("/logout", function (req, res) {
  req.logout();
  req.flash("success", "Bye, you logged out!");
  res.redirect("/login");
});


//testing token 
router.get('/token', function (req, res) {
  var token = jwt.sign({ username: req.user.username }, 'secret', { expiresIn: 120 });
  res.send(token);
})



module.exports = router;
