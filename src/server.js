const app = require("./app");
const { PORT } = require("./config/constants");

app.listen(PORT, () => {
  console.log(`API de Controle de Suplementos rodando na porta ${PORT}.`);
});
