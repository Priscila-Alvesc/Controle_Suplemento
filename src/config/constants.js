const DOSE_SIZE_GRAMS = 100;
const MAX_DAILY_WITHDRAWALS = 4;
const INITIAL_STOCK_GRAMS = 5000;
const JWT_SECRET = process.env.JWT_SECRET || "controle-suplemento-secret";
const JWT_EXPIRES_IN_SECONDS = 3600;
const PORT = Number(process.env.PORT || 3000);

module.exports = {
  DOSE_SIZE_GRAMS,
  MAX_DAILY_WITHDRAWALS,
  INITIAL_STOCK_GRAMS,
  JWT_SECRET,
  JWT_EXPIRES_IN_SECONDS,
  PORT,
};
