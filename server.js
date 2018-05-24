const express = require("express");
const hbs = require("hbs");
const fs = require("fs");

const port = process.env.PORT || 3000;
const app = express();
// register partial view directory
hbs.registerPartials(__dirname + "/views/partials");

// set hbs helpers (this can be used anywher in the template)
//helpers with no arguments
hbs.registerHelper("getCurrentYear", () => {
  return new Date().getFullYear();
});

hbs.registerHelper("CompanyName", () => {
  return "Your Company Name";
});

hbs.registerHelper("upperCase", text => {
  return text.toUpperCase();
});
// set view engine to hbs
app.set("view engine", "hbs");

app.use((req, res, next) => {
  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url}`;
  //   console.log(log);
  fs.appendFile("server.log", log + "\n", err => {
    if (err) {
      console.log("Unable to log ");
    }
  });
  next();
});

// set template folders for html. we can directly access html files in the directory
//eg.  localhost/help.html
app.use(express.static(__dirname + "/public"));

// for maintenance 
// app.use((req, res, next) => {
//   res.render("maintenance.hbs");
// });
// set routes
app.get("/", (req, res) => {
  res.render("about.hbs", {
    welcome: "Welcome to Home Page",
    title: "Home Page"
  });
});

app.get("/about", (req, res) => {
  res.render("about.hbs", {
    welcome: "Welcome to About Page",
    title: "About Page"
  });
});

app.get("/bad", (req, res) => {
  res.send({
    errorMessage: "You are on wrong URL"
  });
});

// Server config
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
