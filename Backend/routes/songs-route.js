const express = require("express");
const HttpError = require("../models/http-error");
const router = express.Router();
const uuid = require("uuid");
const { check } = require("express-validator");

const songsController = require("../controllers/songs-cont");

router.get("/:songId", songsController.getSongById);

router.get("/user/:userId", songsController.getSongByUserId);

// need validation

router.post(
  "/",
  [
    check("title").not().isEmpty(),
    check("description").isLength({ min: 5 }),
    
  ],
  songsController.createSong
);

router.patch(
  "/:songId",
  [
    check("title").not().isEmpty(),
    check("description").isLength({ min: 5 }),
  ],
  songsController.updateSong
);

router.delete("/:songId", songsController.deleteSong);

module.exports = router;
