const fs = require("fs");
const { validationResult } = require("express-validator");

const HttpError = require("../models/http-error");
const { getCoordsForAddress } = require("../utils/location");
const Place = require("../models/place");
const User = require("../models/user");
const mongoose = require("mongoose");

const getPlaceById = async (req, res, next) => {
  const placeId = req.params.pid;

  let place;

  try {
    place = await Place.findById(placeId);
  } catch (err) {
    const error = new HttpError(
      "Could not find a place with the provided id in the DB ",
      500
    );

    return next(error);
  }

  if (!place) {
    const error = new HttpError(
      "Could not find a place with the provided id in the DB ",
      500
    );

    return next(error);
  }

  res.json({ place: place.toObject({ getters: true }) });
  // toObject is to turn the "mangooseObject" into onrdinary JS obj,
  //"getters: true" is used to to get rid of "_id"
};

const getPlacesByUserId = async (req, res, next) => {
  const userId = req.params.uid;

  // let places;
  let userWithPlaces;

  try {
    // places = await Place.find({ creator: userId });
    userWithPlaces = await User.findById(userId).populate("places");

    /*Find is available in mondoDB and mongoose. 
    In mongoDB it return a cursor and in mongoose it returns an array.
    The syntax above is used to filter for the documents which creator is equal to userId.
     */
  } catch (err) {
    const error = new HttpError("Fetching places failed", 500);

    return next(error);
  }

  // if (!places || places.length === 0) {
  if (!userWithPlaces || userWithPlaces.places.length === 0) {
    const error = new HttpError(
      "Could not find a place for the provided user in the DB ",
      404
    );

    return next(error);
  }

  res.json({
    // places: places.map((place) => place.toObject({ getters: true })),
    places: userWithPlaces.places.map((place) =>
      place.toObject({ getters: true })
    ),
  });
  /* Here we needed to do the response in a little different way because find returns and array.
  toObject is to turn the "mangooseObject" into onrdinary JS obj,
  "getters: true" is used to to get rid of "_id"
  */
};

const createPlace = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    console.log(errors);
    return next(
      new HttpError("Invalid inputs passed, please check your data.", 422)
    ); //with async codes it's better to use next instead of throw
  }

  const { title, description, address, creator } = req.body;

  let coordinates;

  try {
    coordinates = await getCoordsForAddress(address);
  } catch (error) {
    return next(error);
  }

  const createdPlace = new Place({
    title,
    description,
    address,
    location: coordinates,
    image: req.file.path,
    creator,
  });

  let user;
  try {
    user = await User.findById(creator);
  } catch (err) {
    const error = new HttpError("Creating place failed, please try again", 500);
    return next(error);
  }

  if (!user) {
    const error = new HttpError("Couldn't find user for the provided id.", 404);
    return next(error);
  }

  try {
    const sess = await mongoose.startSession();
    sess.startTransaction();
    await createdPlace.save({ session: sess });
    user.places.push(createdPlace);
    await user.save({ session: sess });
    await sess.commitTransaction();
  } catch (err) {
    const error = new HttpError("Creating place failed, please try again", 500);
    return next(error);
  }

  res.status(201).json({ place: createdPlace });
};

const updatePlace = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const error = new HttpError(
      "Invalid inputs passed, please check your data.",
      422
    );
    return next(error);
  }

  const { id, title, description } = req.body;
  const placeId = req.params.pid;

  let place;
  try {
    place = await Place.findById(placeId);
  } catch (err) {
    const error = new HttpError(
      "Could not find a place with the provided id in the DB ",
      500
    );

    return next(error);
  }

  place.title = title;
  place.description = description;

  try {
    await place.save();
  } catch (err) {
    const error = new HttpError(
      "Could not stored updated place in the DB",
      500
    );

    return next(error);
  }

  res.status(200).json({ place: place.toObject({ getters: true }) });
};

const deletePlace = async (req, res, next) => {
  const placeId = req.params.pid;

  let place;
  try {
    place = await Place.findById(placeId).populate("creator");
  } catch (err) {
    const error = new HttpError("Something went wrong getting the place", 500);
    return next(error);
  }

  if (!place) {
    const error = new HttpError("Couldn't find the place with the id", 404);
    return next(error);
  }

  const imagePath = place.image;

  try {
    // await place.remove()// deprecated
    await place.deleteOne(); //https://mongoosejs.com/docs/deprecations.html#remove

    const session = await mongoose.startSession();
    session.startTransaction();
    await place.deleteOne({ session: session });
    place.creator.places.pull(place); //thanks to populate that can be done
    await place.creator.save({ session: session });
    await session.commitTransaction();
  } catch (err) {
    const error = new HttpError("Could not delete the place from the DB", 500);

    return next(error);
  }

  fs.unlink(imagePath, (err) => {
    console.log(err);
  });

  res.status(200).json({ message: "Deleted place!" });
};

module.exports = {
  getPlaceById,
  getPlacesByUserId,
  createPlace,
  updatePlace,
  deletePlace,
};
