var express = require("express");
var router = express.Router();
var camp = require("../models/country");
var middleware = require("../middleware");



// Main Page Route showing our list of yelp camp
router.get("/countries", middleware.isLoggedIn, function (req, res) {
  // get all countries from DB
  camp.find({}, function (err, allCou) {
    if (err) {
      console.log(err);
    }
    else {
      res.render("main/main", { camps: allCou, currentUser: req.user, success: true });
    }
  });
});

// only loggedIn user should be able to post, so i add func isLoggedIn to handle that.
// Route to add new camp
router.post("/countries", middleware.isLoggedIn, function (req, res) {
  var country = req.body.country;
  var author = {
    id: req.user._id,
    username: req.user.username
  };


  var newCountry = {
    country: country,
    author: author
  };

  //create a new camp and save to DB
  camp.create(newCountry, function (err, newlyCou) {
    if (err) {
      console.log(err);
    }
    else {
      //redirect to camp list page
      console.log(newlyCou);
      res.redirect("/countries");
    }
  });
});

// Route - to show create form for new camp
// only loggedIn user should be able to view , so i add func isLoggedIn to handle that.
router.get("/countries/new", middleware.isLoggedIn, function (req, res) {
  res.render("main/new");
});



// DESTROY  CAMP ROUTE
router.delete("/countries/:id", middleware.isLoggedIn, function (req, res) {
  camp.findByIdAndRemove(req.params.id, function (err) {
    if (err) {
      res.redirect("/countries");
    }
    else {
      res.redirect("/countries");
    }
  });
});


module.exports = router;
