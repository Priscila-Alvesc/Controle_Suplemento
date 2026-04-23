const { createUser, findUserByEmail } = require("../data/store");
const { HttpError } = require("../utils/httpError");
const { isValidEmail, normalizeEmail } = require("../utils/validators");

function validateCreateUserPayload(payload) {
  const details = [];
  const name = String(payload.name || "").trim();
  const email = normalizeEmail(payload.email);
  const password = String(payload.password || "");

  if (name.length < 3 || name.length > 120) {
    details.push({
      field: "name",
      message: "O nome deve ter entre 3 e 120 caracteres.",
    });
  }

  if (!email || email.length > 255 || !isValidEmail(email)) {
    details.push({
      field: "email",
      message: "O e-mail informado e invalido.",
    });
  }

  if (password.length < 6 || password.length > 60) {
    details.push({
      field: "password",
      message: "A senha deve ter entre 6 e 60 caracteres.",
    });
  }

  if (details.length > 0) {
    throw new HttpError(400, "Dados de entrada invalidos.", details);
  }

  return { name, email, password };
}

function registerUser(payload) {
  const validatedPayload = validateCreateUserPayload(payload);

  if (findUserByEmail(validatedPayload.email)) {
    throw new HttpError(409, "Usuario ja cadastrado.", [
      {
        field: "email",
        message: "Ja existe um usuario com o e-mail informado.",
      },
    ]);
  }

  const user = createUser(validatedPayload);

  return {
    id: user.id,
    name: user.name,
    email: user.email,
    createdAt: user.createdAt,
  };
}

module.exports = {
  registerUser,
};
