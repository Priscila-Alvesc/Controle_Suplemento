const express = require("express");
const { login } = require("../services/authService");

const router = express.Router();

router.post("/login", (req, res, next) => {
  try {
    const authResult = login(req.body);
    return res.status(200).json(authResult);
  } catch (error) {
    return next(error);
  }
});

module.exports = router;
