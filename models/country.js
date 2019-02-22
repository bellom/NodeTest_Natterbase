var mongoose = require("mongoose");

//SCHEMA SET-UP
var campSchema = new mongoose.Schema({
   country: String
});

var camp = mongoose.model("Camp", campSchema);
module.exports = camp;
