require("dotenv").config();
const express = require("express");
const body_parser = require("body-parser");
const app = express();
const port = process.env.PORT || 3000;
const version = process.env.VERSION_API;

// Configure express
app.use(express.json({ limit: "25mb" }));
app.use(body_parser.urlencoded({ extended: true }));

// Routes
app.use(`/api/${version}`, require(`./routes/${version}/index`));
app.use(`/api/${version}`, require(`./routes/${version}/clients`));
app.use(`/api/${version}`, require(`./routes/${version}/estrategias`));
app.use(`/api/${version}`, require(`./routes/${version}/emails`));

// Configure header, cors
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Credentials", "true");
  res.header(
    "Access-Control-Allow-Headers",
    "Authorization, X-API-KEY, Origin, Content-Type, Accept, Access-Control-Allow-Request-Method, Access-Control-Allow-Credentials"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, DELETE, PUT");
  res.header("Allow", "GET, POST, OPTIONS");
  next();
});

// Run node server
var server = app.listen(port, function () {
  console.log("Server running on port " + port);
});
