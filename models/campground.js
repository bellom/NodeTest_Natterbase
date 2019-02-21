var mongoose = require("mongoose");

//SCHEMA SET-UP
var campSchema = new mongoose.Schema({
   country: String,
   author: {
      id: {
         type: mongoose.Schema.Types.ObjectId,
         ref: "User"
      },
      username: String
   }
});

var camp = mongoose.model("Camp", campSchema);
module.exports = camp;
