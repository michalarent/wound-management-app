const express = require("express");
const HttpError = require("../models/http-error");
const router = express.Router();
const uuid = require("uuid");
const { check } = require("express-validator");

const woundController = require("../controllers/wound-cont");

router.get("/:woundId", woundController.getWoundById);

router.get("/user/:userId", woundController.getWoundsByUserId);

// need validation

router.post(
  "/",
  [
    check("name").not().isEmpty(),
    check("description").isLength({ min: 5 }),
    check("bodyPart").isLength({ min: 5 }),
    
  ],
  woundController.createWound
);

router.patch(
  "/:woundId",
  [
    check("name").not().isEmpty(),
    check("description").isLength({ min: 5 }),
  ],
  woundController.updateWound
);

router.delete("/:woundId", woundController.deleteWound);

module.exports = router;
