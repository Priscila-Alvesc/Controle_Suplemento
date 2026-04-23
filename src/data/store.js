const { randomUUID } = require("crypto");
const { INITIAL_STOCK_GRAMS } = require("../config/constants");

const state = {
  users: [],
  withdrawals: [],
  stock: {
    availableGrams: INITIAL_STOCK_GRAMS,
  },
};

function createUser({ name, email, password }) {
  const user = {
    id: randomUUID(),
    name,
    email,
    password,
    createdAt: new Date().toISOString(),
  };

  state.users.push(user);

  return user;
}

function findUserByEmail(email) {
  return state.users.find((user) => user.email === email);
}

function findUserById(id) {
  return state.users.find((user) => user.id === id);
}

function createWithdrawal({ userId, quantity, consumedGrams }) {
  const withdrawal = {
    id: randomUUID(),
    userId,
    quantity,
    consumedGrams,
    withdrawnAt: new Date().toISOString(),
  };

  state.withdrawals.push(withdrawal);
  state.stock.availableGrams -= consumedGrams;

  return withdrawal;
}

function listWithdrawalsByUserAndDate(userId, date) {
  return state.withdrawals.filter((withdrawal) => {
    return (
      withdrawal.userId === userId &&
      withdrawal.withdrawnAt.slice(0, 10) === date
    );
  });
}

function getState() {
  return state;
}

module.exports = {
  createUser,
  createWithdrawal,
  findUserByEmail,
  findUserById,
  getState,
  listWithdrawalsByUserAndDate,
};
