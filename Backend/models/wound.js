const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const woundSchema = new Schema({
  name: { type: String, required: true },
  bodyPart: { type: String, required: true },
  description: { type: String, required: true },
  owner: { type: mongoose.Types.ObjectId, required: true, ref: 'User' },
  dateLastEdited: { type: Date, default: Date.now },
  dateCreated: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Wound", woundSchema);
