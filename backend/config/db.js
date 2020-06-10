
/**
Description : The file will take care of the database connectivity 
*/
var mongoose = require("mongoose");
mongoose.Promise = bluebird;

// Connecting to local Database
mongoose
.connect("mongodb://username:password@ip-address/dbname", {
useUnifiedTopology: true,
useNewUrlParser: true,
})

var db = mongoose.connection;

// CONNECTION EVENTS

// When successfully scheduleconnected
db.on("connected", function () {
  console.log("Mongoose default connection open");
});

// When the connection is disconnected
db.on("disconnected", function () {
  console.log("Mongoose default connection disconnected");
});

// If the connection throws an error
db.on("error", function (err) {
  console.log("Mongoose default connection error: " + err);
});

// If the Node process ends, close the Mongoose connection
process.on("SIGINT", function () {
  mongoose.connection.close(function () {
    console.log(
      "Mongoose default connection disconnected through app termination"
    );
    process.exit(0);
  });
});
