const jwt = require("jsonwebtoken");
const { findUserByEmail } = require("../data/store");
const {
  JWT_EXPIRES_IN_SECONDS,
  JWT_SECRET,
} = require("../config/constants");
const { HttpError } = require("../utils/httpError");
const { isValidEmail, normalizeEmail } = require("../utils/validators");

function login(payload) {
  const email = normalizeEmail(payload.email);
  const password = String(payload.password || "");

  if (!email || !password || !isValidEmail(email) || password.length < 6) {
    throw new HttpError(401, "Credenciais invalidas.");
  }

  const user = findUserByEmail(email);

  if (!user || user.password !== password) {
    throw new HttpError(401, "Credenciais invalidas.");
  }

  const accessToken = jwt.sign(
    {
      sub: user.id,
      email: user.email,
      name: user.name,
    },
    JWT_SECRET,
    { expiresIn: JWT_EXPIRES_IN_SECONDS }
  );

  return {
    accessToken,
    tokenType: "Bearer",
    expiresIn: JWT_EXPIRES_IN_SECONDS,
  };
}

module.exports = {
  login,
};
