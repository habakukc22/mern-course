const express = require("express");
const bodyParser = require("body-parser");

const placesRoutes = require("./routes/places-routes");
const usersRoutes = require("./routes/users-routes");
const HttpError = require("./models/http-error");

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

app.listen(5000);
