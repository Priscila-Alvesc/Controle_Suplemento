const express = require("express");
const { authMiddleware } = require("../middlewares/authMiddleware");
const {
  createUserWithdrawal,
  getDailyWithdrawals,
} = require("../services/withdrawalService");

const router = express.Router();

router.post("/", authMiddleware, (req, res, next) => {
  try {
    const withdrawal = createUserWithdrawal(req.user.id, req.body);
    return res.status(201).json(withdrawal);
  } catch (error) {
    return next(error);
  }
});

router.get("/daily", authMiddleware, (req, res, next) => {
  try {
    return res.status(200).json(getDailyWithdrawals(req.user.id));
  } catch (error) {
    return next(error);
  }
});

module.exports = router;
