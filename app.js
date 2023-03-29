const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

app.post("/user", (req, res, next) => {
  /*bodyParser role
  req.body will exist thanks to bodyParser and what was passed into the input can be accessed with the key "username" (the atribute name of the input)
  */

  res.send("<h1>" + req.body.username + "</h1>");
});

app.get("/", (req, res, next) => {
  res.send(
    '<form action="/user" method="POST"><input type="text" name="username" /><button type="submit">Send</button></form>'
  );
});

app.listen(5000);
