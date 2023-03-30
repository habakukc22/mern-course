const { v4: uuidV4 } = require("uuid");
const { validationResult } = require("express-validator");

const HttpError = require("../models/http-error");

let DUMMY_USERS = [
  {
    id: "u1",
    name: "Habakuk Conrado",
    email: "habakuk@gmail.com",
    password: "123456",
  },
];

const getUsers = (req, res, next) => {
  res.status(200).json({ users: DUMMY_USERS });
};

const signup = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    console.log(errors);
    throw new HttpError("Invalid inputs passed, please check your data.", 422);
  }

  const { name, email, password } = req.body;

  const hasUser = DUMMY_USERS.find((u) => u.email === email);

  if (hasUser) {
    throw new HttpError("ERROR: User already exists", 422);
  }

  const createdUser = {
    id: uuidV4(),
    name,
    email,
    password,
  };

  DUMMY_USERS.push(createdUser);

  res.status(201).json({ user: createdUser });
};

const login = (req, res, next) => {
  const { email, password } = req.body;

  const userToLogin = DUMMY_USERS.find((u) => u.email === email);

  if (!userToLogin || password !== userToLogin.password) {
    throw new HttpError("User not found! Credentials may be wrong.", 401);
  }

  res.status(200).json({ message: "Logged In!" });
};

module.exports = {
  getUsers,
  signup,
  login,
};
