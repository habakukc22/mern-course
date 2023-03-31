const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const placesRoutes = require("./routes/places-routes");
const usersRoutes = require("./routes/users-routes");
const HttpError = require("./models/http-error");
const credentials = require("./credentials");

const app = express();

app.use(bodyParser.json()); //bodyParser.json will get any incoming json data, parse it and then call the next middleware

app.use("/api/places", placesRoutes); // app.use("/api/users", usersRoutes);

app.use("/api/users", usersRoutes);

app.use((req, res, next) => {
  const error = new HttpError("Could not find this route!", 404);
  throw error;
  // next(error) //Equivalently;
}); //This middleware will be reached only if the previous router middleware did not send a response

app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }

  res
    .status(error.code || 500)
    .json({ message: error.message } || "Unknown error occurred!");
}); //A middleware like the one above is called only when an error is thrown

const dbName = "places";

const { username, password } = credentials;

// console.log(username, password);

let url = `mongodb+srv://${username}:${password}@cluster0.orn0ind.mongodb.net/${dbName}?retryWrites=true&w=majority`;

mongoose
  .connect(url)
  .then(() => {
    console.log("Connected to the DB!");

    app.listen(5000);
  })
  .catch((err) => console.log(err));

// mongodb+srv://<username>:<password>@cluster0.orn0ind.mongodb.net/?retryWrites=true&w=majority
