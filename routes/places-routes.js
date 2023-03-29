const express = require("express");

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

  res.json({ place });
});

router.get("/user/:uid", (req, res, next) => {
  const userId = req.params.uid;
  console.log("GET resquest in places of user " + userId);

  const places = DUMMY_PLACES.filter((place) => place.creator === userId);

  res.json({ places });
});

//The order of the routes matters!

module.exports = router;
