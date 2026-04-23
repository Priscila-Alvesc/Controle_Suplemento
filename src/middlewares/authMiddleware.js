const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config/constants");
const { findUserById } = require("../data/store");

function authMiddleware(req, res, next) {
  const authorization = req.headers.authorization || "";
  const [scheme, token] = authorization.split(" ");

  if (scheme !== "Bearer" || !token) {
    return res.status(401).json({ error: "Usuario nao autenticado." });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const user = findUserById(decoded.sub);

    if (!user) {
      return res.status(401).json({ error: "Usuario nao autenticado." });
    }

    req.user = {
      id: user.id,
      email: user.email,
      name: user.name,
    };

    return next();
  } catch (error) {
    return res.status(401).json({ error: "Usuario nao autenticado." });
  }
}

module.exports = {
  authMiddleware,
};
