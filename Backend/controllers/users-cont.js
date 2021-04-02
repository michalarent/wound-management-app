const HttpError = require("../models/http-error");
// const uuid = require("uuid").v4;
const User = require('../models/user.js');


const DUMMY_USERS = [
  {
    id: "u1",
    name: "AS",
    email: "a@b.c",
    password: "abc",
  },
  {
    id: "u2",
    name: "AS",
    email: "a@b.xcc",
    password: "abc",
  },
];

const getUserById = (req, res, next) => {
  const userId = req.params.userId;
  const user = DUMMY_USERS.find((u) => {
    return u.id === userId;
  });
  console.log("GET Request in Users");
  res.json({ user });
};

const getUsers = async (req, res, next) => {
    let users;
    try {
      users = await User.find({}, '-password');
    } catch (err) {
      const error = new HttpError(
        'Fetching users failed, please try again later.',
        500
      );
      return next(error);
    }
    res.json({users: users.map(user => user.toObject({ getters: true }))});
  };

const signUpUser = async (req, res, next) => {
    const { name, email, password } = req.body;

  let existingUser
  try {
    existingUser = await User.findOne({ email: email })
  } catch (err) {
    const error = new HttpError(
      err,
      500
    );
    return next(error);
  }
  
  if (existingUser) {
    const error = new HttpError(
      'User exists already, please login instead.',
      422
    );
    return next(error);
  }
  
  const createdUser = new User({
    name,
    email,
    image: 'https://live.staticflickr.com/7631/26849088292_36fc52ee90_b.jpg',
    password,
    wounds: []
  });

  try {
    await createdUser.save();
  } catch (err) {
    const error = new HttpError(
      err,
      500
    );
    return next(error);
  }

  res.status(201).json({user: createdUser.toObject({ getters: true })});
  };

  const loginUser = async (req, res, next) => {
    const { email, password } = req.body;
  
    let existingUser;
  
    try {
      existingUser = await User.findOne({ email: email })
    } catch (err) {
      const error = new HttpError(
        'Logging in failed, please try again later.',
        500
      );
      return next(error);
    }
  
    if (!existingUser || existingUser.password !== password) {
      const error = new HttpError(
        'Invalid credentials, could not log you in.',
        401
      );
      return next(error);
    }
    
    
    res.status(201).json({ user: existingUser.toObject({ getters: true }) });
    
};

exports.getUserById = getUserById;
exports.getUsers = getUsers;
exports.loginUser = loginUser;
exports.signUpUser = signUpUser;
