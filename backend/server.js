var express = require("express");
var path = require("path");
var bodyParser = require("body-parser");
var cors = require("cors");
var http = require("http");
var port = process.env.PORT || 3586;

var job = require("./routes/job");
var db = require("./config/db.js");

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false, limit: "100mb" }));
app.use(cors());
app.use(express.static(path.join(__dirname, "public")));

//routes
app.use("/post", job);

app.use(express.static(path.join(__dirname, "build")));
app.get("/*", function (req, res) {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error("Not Found");
  err.status = 404;
  next(err);
});
var server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port, function (err) {
  if (err) {
    console.log(err);
  } else {
    console.log("Server api runing on port ", port);
  }
});
module.exports = app;
