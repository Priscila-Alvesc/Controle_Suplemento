const express = require("express");
const { registerUser } = require("../services/userService");

const router = express.Router();

router.post("/", (req, res, next) => {
  try {
    const user = registerUser(req.body);
    return res.status(201).json(user);
  } catch (error) {
    return next(error);
  }
});

module.exports = router;
