const {
  app,
  request,
  resetState,
  registerUser,
  loginUser,
} = require("./helpers/apiTestHelper");

describe("US02 - Autenticacao", () => {
  beforeEach(() => {
    resetState();
  });

  it("[Caso de Teste 02.01] - Login com credenciais validas", async () => {
    await registerUser();
    const response = await loginUser();

    expect(response.status).to.equal(200);
    expect(response.body.tokenType).to.equal("Bearer");
    expect(response.body.expiresIn).to.equal(3600);
    expect(response.body.accessToken).to.be.a("string");
  });

  it("[Caso de Teste 02.02] - Login com senha incorreta", async () => {
    await registerUser();
    const response = await loginUser({ password: "senhaerrada" });

    expect(response.status).to.equal(401);
    expect(response.body).to.deep.equal({
      error: "Credenciais invalidas.",
    });
  });

  it("[Caso de Teste 02.08] - Login com servico indisponivel", async () => {
    const response = await request(app)
      .post("/api/auth/login")
      .set("x-force-unavailable", "true")
      .send({
        email: "priscila.alves@email.com",
        password: "123456",
      });

    expect(response.status).to.equal(503);
    expect(response.body).to.deep.equal({
      error: "Servico temporariamente indisponivel.",
    });
  });
});
