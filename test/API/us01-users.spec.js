const {
  app,
  request,
  resetState,
  registerUser,
} = require("../helpers/apiTestHelper");

describe("US01 - Cadastro de usuario", () => {
  beforeEach(() => {
    resetState();
  });

  it("[Caso de Teste 01.01] - Cadastro com dados validos", async () => {
    const response = await registerUser();

    expect(response.status).to.equal(201);
    expect(response.body).to.include({
      name: "Priscila Alves",
      email: "priscila.alves@email.com",
    });
    expect(response.body.id).to.be.a("string");
    expect(response.body.createdAt).to.be.a("string");
  });

  it("[Caso de Teste 01.02] - Cadastro sem campo obrigatorio e-mail", async () => {
    const response = await request(app).post("/api/users").send({
      name: "Joao Silva",
      password: "123456",
    });

    expect(response.status).to.equal(400);
    expect(response.body.error).to.equal("Dados de entrada invalidos.");
    expect(response.body.details).to.be.an("array");
    expect(response.body.details[0].field).to.equal("email");
  });

  it("[Caso de Teste 01.03] - Cadastro duplicado com mesmo e-mail", async () => {
    await registerUser();
    const response = await registerUser();

    expect(response.status).to.equal(409);
    expect(response.body.error).to.equal("Usuario ja cadastrado.");
    expect(response.body.details).to.be.an("array");
    expect(response.body.details[0].field).to.equal("email");
  });

  it("[Caso de Teste 01.04] - Cadastro com servico indisponivel", async () => {
    const response = await request(app)
      .post("/api/users")
      .set("x-force-unavailable", "true")
      .send({
        name: "Lucas Ferreira",
        email: "lucas@email.com",
        password: "123456",
      });

    expect(response.status).to.equal(503);
    expect(response.body).to.deep.equal({
      error: "Servico temporariamente indisponivel.",
    });
  });
});
