const express = require("express");

const usersController = require("../controllers/users-cont");
const { check } = require("express-validator");
const router = express.Router();



router.get("/:userId", usersController.getUserById);

router.get("/", usersController.getUsers);

router.post(
  '/signup',
  [
    check('name')
      .not()
      .isEmpty(),
    check('email')
      .normalizeEmail() // Test@test.com => test@test.com
      .isEmail(),
    check('password').isLength({ min: 6 })
  ],
  usersController.signUpUser
);

router.post('/login', usersController.loginUser);


module.exports = router;
