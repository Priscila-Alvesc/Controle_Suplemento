const express = require("express");
const path = require("path");
const usersRoutes = require("./routes/usersRoutes");
const authRoutes = require("./routes/authRoutes");
const stockRoutes = require("./routes/stockRoutes");
const withdrawalsRoutes = require("./routes/withdrawalsRoutes");
const {
  errorHandler,
  notFoundHandler,
} = require("./middlewares/errorHandler");

const app = express();
const swaggerFilePath = path.resolve(__dirname, "..", "docs");

app.use(express.json());

app.use((req, res, next) => {
  const forcedByHeader = req.get("x-force-unavailable") === "true";
  const forcedByEnvironment = process.env.FORCE_UNAVAILABLE === "true";

  if (forcedByHeader || forcedByEnvironment) {
    return res.status(503).json({
      error: "Servico temporariamente indisponivel.",
    });
  }

  return next();
});

app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok" });
});

app.get("/docs", (req, res) => {
  res.status(200).type("html").send(`<!DOCTYPE html>
<html lang="pt-BR">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Swagger UI - Controle de Suplementos</title>
    <link
      rel="stylesheet"
      href="https://unpkg.com/swagger-ui-dist@5/swagger-ui.css"
    />
    <style>
      body {
        margin: 0;
        background: #f7f4ee;
      }

      .topbar {
        display: none;
      }
    </style>
  </head>
  <body>
    <div id="swagger-ui"></div>
    <script src="https://unpkg.com/swagger-ui-dist@5/swagger-ui-bundle.js"></script>
    <script>
      window.onload = () => {
        window.ui = SwaggerUIBundle({
          url: "/docs/swagger.yaml",
          dom_id: "#swagger-ui",
          deepLinking: true,
          docExpansion: "list",
          persistAuthorization: true
        });
      };
    </script>
  </body>
</html>`);
});

app.use("/docs", express.static(swaggerFilePath));

app.use("/api/users", usersRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/stock", stockRoutes);
app.use("/api/withdrawals", withdrawalsRoutes);

app.use(notFoundHandler);
app.use(errorHandler);

module.exports = app;
