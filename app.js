var express = require("express");
var app = express();
var router = express.Router();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var flash = require("connect-flash");
var passport = require("passport");
var localStrategy = require("passport-local");
var methodOverride = require("method-override");
var camp = require("./models/campground");
var user = require("./models/user");

//Requiring Routes
var mainRoute = require("./routes/main");
var authRoute = require("./routes/auth");

//Swagger config
var swaggerUi = require('swagger-ui-express');
var swaggerDocument = require('./swagger.json');

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
//app.use('/api/v1', router);



mongoose.connect("mongodb://localhost:27017/NatterBase", { useNewUrlParser: true });
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());


//PASSPORT CONFIGURATION
app.use(require("express-session")({
   secret: "the name of my first love",
   resave: false,
   saveUninitialized: false
}));
//PASSPORT PLUGINs
app.use(passport.initialize());
app.use(passport.session());
//to read the session and decode and encode
passport.use(new localStrategy(user.authenticate()));
passport.serializeUser(user.serializeUser());
passport.deserializeUser(user.deserializeUser());

//to make use of currentUser value in all route
app.use(function (req, res, next) {
   res.locals.currentUser = req.user;
   res.locals.error = req.flash("error");
   res.locals.success = req.flash("success");
   next();
});


app.use(mainRoute);
app.use(authRoute);



app.listen(process.env.PORT, process.env.IP, function () {
   console.log("Country List App server up and running!!!");
});


module.exports = app;
