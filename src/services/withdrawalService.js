const {
  DOSE_SIZE_GRAMS,
  MAX_DAILY_WITHDRAWALS,
} = require("../config/constants");
const {
  createWithdrawal,
  getState,
  listWithdrawalsByUserAndDate,
} = require("../data/store");
const { HttpError } = require("../utils/httpError");

function getCurrentDate() {
  return new Date().toISOString().slice(0, 10);
}

function createUserWithdrawal(userId, payload) {
  const quantity = Number(payload.quantity);

  if (quantity !== 1 ) {
    throw new HttpError(400, "Quantidade invalida para retirada.", [
      {
        field: "quantity",
        message: "Apenas 1 dose por solicitacao e permitida.",
      },
    ]);
  }

  const date = getCurrentDate();
  const dailyWithdrawals = listWithdrawalsByUserAndDate(userId, date);

  if (dailyWithdrawals.length >= MAX_DAILY_WITHDRAWALS) {
    throw new HttpError(409, "Limite diario de doses excedido.");
  }

  if (getState().stock.availableGrams < DOSE_SIZE_GRAMS) {
    throw new HttpError(409, "Estoque insuficiente para retirada.");
  }

  const withdrawal = createWithdrawal({
    userId,
    quantity,
    consumedGrams: DOSE_SIZE_GRAMS,
  });

  return {
    id: withdrawal.id,
    userId: withdrawal.userId,
    quantity: withdrawal.quantity,
    consumedGrams: withdrawal.consumedGrams,
    remainingDoses: Math.floor(getState().stock.availableGrams / DOSE_SIZE_GRAMS),
    withdrawnAt: withdrawal.withdrawnAt,
  };
}

function getDailyWithdrawals(userId) {
  const date = getCurrentDate();
  const withdrawals = listWithdrawalsByUserAndDate(userId, date);
  const totalWithdrawals = withdrawals.length;
  const totalConsumedGrams = withdrawals.reduce(
    (sum, withdrawal) => sum + withdrawal.consumedGrams,
    0
  );

  return {
    userId,
    date,
    totalWithdrawals,
    totalConsumedGrams,
    remainingDailyLimit: Math.max(0, MAX_DAILY_WITHDRAWALS - totalWithdrawals),
    withdrawals: withdrawals.map((withdrawal) => ({
      id: withdrawal.id,
      quantity: withdrawal.quantity,
      consumedGrams: withdrawal.consumedGrams,
      withdrawnAt: withdrawal.withdrawnAt,
    })),
  };
}

module.exports = {
  createUserWithdrawal,
  getDailyWithdrawals,
};
