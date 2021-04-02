const HttpError = require("../models/http-error");
const uuid = require("uuid").v4;
const { validationResult, body } = require("express-validator");
const mongoose = require("mongoose");
const Wound = require("../models/wound");
const User = require("../models/user");

let DUMMY_WOUNDS = [
  {
    id: "s1",
    creator: "u1",
    title: "Jebać PiS",
    description: "nice!!!",
    url: "spotify",
  },
];

const getWoundById = async (req, res, next) => {
  const woundId = req.params.woundId;

  let wound;
  try {
    wound = await Wound.findById(woundId);
  } catch (err) {
    const error = new HttpError("Something went wrong.", 500);
    return next(error);
  }

  if (!wound) {
    const error = new HttpError("Couldn't find id", 404);
    return next(error);
  }

  console.log("GET Request in Wounds");
  res.json({ wound: wound.toObject({ getters: true }) });
};

const getWoundsByUserId = async (req, res, next) => {
  const userId = req.params.userId;

  let wounds;
  try {
    wounds = await Wound.find({ owner: userId });
  } catch (err) {
    const error = new HttpError("Something went wrong.", 500);
    return next(error);
  }

  if (!wounds || wounds.length === 0) {
    return next(new HttpError("Couldn't find wounds by id"));
  }

  console.log("GET Request in Wound");
  res.json({ wound: wounds.map((w) => w.toObject({ getters: true })) });
};

const updateWound = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(errors);
    throw new HttpError("Invalid inputs!");
  }

  const dateLastEdited = Date.now();
  const { name, bodyPart, description } = req.body;
  const woundId = req.params.woundId;

  let wound;
  try {
    wound = await Wound.findById(woundId);
  } catch (err) {
    const error = new HttpError("Sth wrong!", 500);
    return next(error);
  }

  wound.name = name;
  wound.bodyPart = bodyPart;
  wound.description = description;
  wound.dateLastEdited = dateLastEdited;

  try {
    await wound.save();
  } catch (err) {
    const error = new HttpError("Sth wrong!", 500);
  }

  res.status(200).json({ wound: wound.toObject({ getters: true }) });
};

const deleteWound = async (req, res, next) => {
  const woundId = req.params.woundId;

  let wound;
  try {
    wound = await Wound.findById(woundId).populate("owner");
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not delete wound.",
      500
    );
    return next(error);
  }

  if (!wound) {
    const error = new HttpError("Could not find wound for this id.", 404);
    return next(error);
  }

  try {
    const sess = await mongoose.startSession();
    sess.startTransaction();
    await wound.remove({ session: sess });
    wound.owner.wounds.pull(wound);
    await wound.owner.save({ session: sess });
    await sess.commitTransaction();
  } catch (err) {
    const error = new HttpError(err, 500);
    return next(error);
  }

  res.status(200).json({ message: "Deleted wound." });
};

const createWound = async (req, res, next) => {
  //   const errors = validationResult(req);
  //   if (!errors.isEmpty()) {
  //     console.log(errors);
  //     throw new HttpError("Invalid inputs!");
  //   }

  const { name, bodyPart, description, owner } = req.body;

  const createdWound = new Wound({
    name,
    bodyPart,
    description,
    owner
  });

  let user;
  try {
    console.log(owner)
    user = await User.findById(owner);
  } catch (err) {
    const error = new HttpError(err, 500);
    return next(error);
  }
  console.log('user found')

  if (!user) {
    const error = new HttpError("No user with given id", 404);
    return next(error);
  }

  try {
    const session = await mongoose.startSession();
    console.log('sessoin started');
    session.startTransaction();
    console.log('transaction started');
    await createdWound.save({ session: session });
    console.log('wound saved');
    user.wounds.push(createdWound);
    console.log('wound pushed');
    await user.save({ session: session });
    console.log('user saved');
    await session.commitTransaction();
    console.log('transaction comited');
  } catch (err) {
    const error = new HttpError(err, 500);
    return next(error);
  }

  try {
    createdWound.save();
  } catch (err) {
    const error = new HttpError("Failed here!", 500);
    return next(error);
  }

  res.status(201).json(createdWound);
};

exports.getWoundById = getWoundById;
exports.getWoundsByUserId = getWoundsByUserId;
exports.updateWound = updateWound;
exports.deleteWound = deleteWound;
exports.createWound = createWound;
