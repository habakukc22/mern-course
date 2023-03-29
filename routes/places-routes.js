const express = require("express");

const HttpError = require("../models/http-error");

const router = express.Router();

const DUMMY_PLACES = [
  {
    id: "p1",
    title: "Empire State Building",
    description: "One of the most famous sky scrapers in the world",
    location: {
      lat: 40.7484474,
      lng: -73.9871516,
    },
    address: "20 W 34th St, NY 10001",
    creator: "u1",
  },
];

router.get("/:pid", (req, res, next) => {
  console.log("GET resquest in places");

  const placeId = req.params.pid;
  const place = DUMMY_PLACES.find((place) => place.id === placeId);

  if (!place) {
    throw new HttpError("Could not find a place with the id provided", 404);
  }

  res.json({ place });
});

router.get("/user/:uid", (req, res, next) => {
  const userId = req.params.uid;
  console.log("GET resquest in places of user " + userId);

  const place = DUMMY_PLACES.find((place) => place.creator === userId);

  if (!place) {
    return next(new HttpError("No place for the provided user id!", 404));
  }

  res.json({ place });
});

module.exports = router;
