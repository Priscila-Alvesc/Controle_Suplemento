const request = require("supertest");
const app = require("../app");
const { getState } = require("../data/store");
const { INITIAL_STOCK_GRAMS } = require("../config/constants");

function resetState() {
  const state = getState();
  state.users.length = 0;
  state.withdrawals.length = 0;
  state.stock.availableGrams = INITIAL_STOCK_GRAMS;
}

async function registerUser(payload = {}) {
  const data = {
    name: "Priscila Alves",
    email: "priscila.alves@email.com",
    password: "123456",
    ...payload,
  };

  return request(app).post("/api/users").send(data);
}

async function loginUser(payload = {}) {
  const data = {
    email: "priscila.alves@email.com",
    password: "123456",
    ...payload,
  };

  return request(app).post("/api/auth/login").send(data);
}

async function createAuthenticatedUser() {
  await registerUser();
  const loginResponse = await loginUser();
  return loginResponse.body.accessToken;
}

function setAvailableGrams(grams) {
  getState().stock.availableGrams = grams;
}

module.exports = {
  app,
  request,
  resetState,
  registerUser,
  loginUser,
  createAuthenticatedUser,
  setAvailableGrams,
};
