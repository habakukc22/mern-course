const express = require("express");
const bodyParser = require("body-parser");

const placesRoutes = require("./routes/places-routes");
// const usersRoutes = require("./routes/users-routes");

const app = express();

app.use("/api/places", placesRoutes);
// app.use("/api/users", usersRoutes);

app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }

  res
    .status(error.code || 500)
    .json({ message: error.message } || "Unknown error occurred!");
});
//A middleware like the one above is called only when an error is thrown

app.listen(5000);
