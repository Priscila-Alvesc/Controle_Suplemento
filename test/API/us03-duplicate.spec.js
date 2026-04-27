const { resetState, registerUser } = require("../helpers/apiTestHelper");

describe("US03 - Prevencao de cadastro duplicado", () => {
  beforeEach(() => {
    resetState();
  });

  it("[Caso de Teste 03.01] - Cadastro com e-mail ja existente", async () => {
    await registerUser();
    const response = await registerUser();

    expect(response.status).to.equal(409);
    expect(response.body.error).to.equal("Usuario ja cadastrado.");
    expect(response.body.details).to.be.an("array");
    expect(response.body.details[0]).to.deep.include({
      field: "email",
    });
  });
});
