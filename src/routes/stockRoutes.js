const express = require("express");
const { getAvailableDoses } = require("../services/stockService");
const { authMiddleware } = require("../middlewares/authMiddleware");

const router = express.Router();

router.get("/doses", authMiddleware, (req, res, next) => {
  try {
    return res.status(200).json(getAvailableDoses());
  } catch (error) {
    return next(error);
  }
});

module.exports = router;
