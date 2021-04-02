const HttpError = require("../models/http-error");
const uuid = require("uuid").v4;
const { validationResult } = require("express-validator");
const mongoose = require("mongoose");
const Song = require("../models/song");
const User = require("../models/user");

let DUMMY_SONGS = [
  {
    id: "s1",
    creator: "u1",
    title: "Jebać PiS",
    description: "nice!!!",
    url: "spotify",
  },
  {
    creator: "u2",
    id: "s2",
    title: "Jebać PiS",
    description: "nice!!!",
    url: "spotify",
  },
];

const getSongById = async (req, res, next) => {
  const songId = req.params.songId;

  let song;
  try {
    song = await Song.findById(songId);
  } catch (err) {
    const error = new HttpError("Something went wrong.", 500);
    return next(error);
  }

  if (!song) {
    const error = new HttpError("Couldn't find id", 404);
    return next(error);
  }

  console.log("GET Request in Songs");
  res.json({ song: song.toObject({ getters: true }) });
};

const getSongByUserId = async (req, res, next) => {
  const userId = req.params.userId;

  let songs;
  try {
    songs = await Song.find({ creator: userId });
  } catch (err) {
    const error = new HttpError("Something went wrong.", 500);
    return next(error);
  }

  if (!songs || songs.length === 0) {
    return next(new HttpError("Couldn't find songs by id"));
  }

  console.log("GET Request in Songs");
  res.json({ song: songs.map((s) => s.toObject({ getters: true })) });
};

const updateSong = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(errors);
    throw new HttpError("Invalid inputs!");
  }

  const { title, artist, description } = req.body;
  const songId = req.params.songId;

  let song;
  try {
    song = await Song.findById(songId);
  } catch (err) {
    const error = new HttpError("Sth wrong!", 500);
    return next(error);
  }

  song.title = title;
  song.artist = artist;
  song.description = description;

  try {
    await song.save();
  } catch (err) {
    const error = new HttpError("Sth wrong!", 500);
  }

  res.status(200).json({ song: song.toObject({ getters: true }) });
};

const deleteSong = async (req, res, next) => {
  const songId = req.params.songId;

  let song;
  try {
    song = await Song.findById(songId).populate("creator");
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not delete song.",
      500
    );
    return next(error);
  }

  if (!song) {
    const error = new HttpError("Could not find song for this id.", 404);
    return next(error);
  }

  try {
    const sess = await mongoose.startSession();
    sess.startTransaction();
    await song.remove({ session: sess });
    song.creator.songs.pull(song);
    await song.creator.save({ session: sess });
    await sess.commitTransaction();
  } catch (err) {
    const error = new HttpError(
      err,
      500
    );
    return next(error);
  }

  res.status(200).json({ message: "Deleted song." });
};

const createSong = async (req, res, next) => {
  //   const errors = validationResult(req);
  //   if (!errors.isEmpty()) {
  //     console.log(errors);
  //     throw new HttpError("Invalid inputs!");
  //   }

  const { title, artist, description, url, creator } = req.body;

  const createdSong = new Song({
    title,
    artist,
    description,
    url,
    creator,
  });

  let user;
  try {
    user = await User.findById(creator);
  } catch (err) {
    const error = new HttpError(err, 500);
    return next(error);
  }

  if (!user) {
    const error = new HttpError("No user with given id", 404);
    return next(error);
  }

  try {
    const session = await mongoose.startSession();
    session.startTransaction();
    await createdSong.save({ session: session });
    user.songs.push(createdSong);
    await user.save({ session: session });
    await session.commitTransaction();
  } catch (err) {
    const error = new HttpError("Failed!", 500);
    return next(error);
  }

  try {
    createdSong.save();
  } catch (err) {
    const error = new HttpError("Failed!", 500);
    return next(error);
  }

  res.status(201).json(createdSong);
};

exports.getSongById = getSongById;
exports.getSongByUserId = getSongByUserId;
exports.updateSong = updateSong;
exports.deleteSong = deleteSong;
exports.createSong = createSong;
