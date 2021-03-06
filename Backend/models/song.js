const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const songSchema = new Schema({
  title: { type: String, required: true },
  artist: { type: String, required: true },
  description: { type: String, required: true },
  url: { type: String, required: true },
  creator: { type: mongoose.Types.ObjectId, required: true, ref: 'User' },
});

module.exports = mongoose.model("Song", songSchema);
