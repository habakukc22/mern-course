const { v4: uuidV4 } = require("uuid");
const { validationResult } = require("express-validator");

const HttpError = require("../models/http-error");
const User = require("../models/user");

let DUMMY_USERS = [
  {
    id: "u1",
    name: "Habakuk Conrado",
    email: "habakuk@gmail.com",
    password: "123456",
  },
];

const getUsers = async (req, res, next) => {
  let users;
  try {
    users = await User.find({}, "-password");
  } catch (err) {
    const error = new HttpError("Something went wrong", 500);
    return next(error);
  }

  res.json({ users: users.map((user) => user.toObject({ getters: true })) });
};

const signup = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(errors);
    const error = new HttpError(
      "Invalid inputs passed, please check your data.",
      422
    );
    return next(error);
  }
  const { name, email, password, places } = req.body;

  let existingUser;
  try {
    existingUser = await User.findOne({ email: email });
  } catch (err) {
    const error = new HttpError("Something went wrong", 500);
    return next(error);
  }

  if (existingUser) {
    const error = new HttpError(
      "Email already registered! Try to login instead",
      422
    );
    return next(error);
  }

  const createdUser = new User({
    name: name,
    email: email,
    image:
      "https://ichef.bbci.co.uk/news/640/amz/worldservice/live/assets/images/2015/09/26/150926165742__85730600_monkey2.jpg",
    password: password,
    places: places,
  });

  try {
    await createdUser.save();
  } catch (err) {
    const error = new HttpError("Couldn't register user!", 422);
    return next(error);
  }

  res.status(201).json({ user: createdUser.toObject({ getters: true }) });
};

const login = async (req, res, next) => {
  const { email, password } = req.body;

  let existingUser;
  try {
    existingUser = await User.findOne({ email: email });
  } catch (err) {
    const error = new HttpError("Something went wrong! Try again later.", 500);
    return next(error);
  }

  if (!existingUser) {
    const error = new HttpError(
      "User email not found! Please try to register.",
      401
    );
    return next(error);
  }

  if (existingUser.password !== password) {
    const error = new HttpError("Check the password and try again.", 401);
    return next(error);
  }

  res.json({ message: "Logged in!" });
};

module.exports = {
  getUsers,
  signup,
  login,
};
