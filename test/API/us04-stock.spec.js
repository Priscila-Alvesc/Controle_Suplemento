const {
  app,
  request,
  resetState,
  createAuthenticatedUser,
  setAvailableGrams,
} = require("../helpers/apiTestHelper");

describe("US04 - Consulta de doses em estoque", () => {
  beforeEach(() => {
    resetState();
  });

  it("[Caso de Teste 04.01] - Consulta de estoque disponivel com usuario autenticado", async () => {
    const token = await createAuthenticatedUser();
    const response = await request(app)
      .get("/api/stock/doses")
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).to.equal(200);
    expect(response.body).to.deep.equal({
      availableDoses: 50,
      availableGrams: 5000,
      doseSizeGrams: 100,
      status: "AVAILABLE",
    });
  });

  it("[Caso de Teste 04.02] - Consulta de estoque indisponivel com usuario autenticado", async () => {
    const token = await createAuthenticatedUser();
    setAvailableGrams(0);

    const response = await request(app)
      .get("/api/stock/doses")
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).to.equal(200);
    expect(response.body).to.deep.equal({
      availableDoses: 0,
      availableGrams: 0,
      doseSizeGrams: 100,
      status: "UNAVAILABLE",
    });
  });

  it("[Caso de Teste 04.03] - Consulta de estoque doses insuficientes para uma dose", async () => {
    const token = await createAuthenticatedUser();
    setAvailableGrams(75);

    const response = await request(app)
      .get("/api/stock/doses")
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).to.equal(200);
    expect(response.body).to.deep.equal({
      availableDoses: 0,
      availableGrams: 75,
      doseSizeGrams: 100,
      status: "UNAVAILABLE",
    });
  });

  it("[Caso de Teste 04.04] - Consulta de estoque sem token JWT", async () => {
    const response = await request(app).get("/api/stock/doses");

    expect(response.status).to.equal(401);
    expect(response.body).to.deep.equal({
      error: "Usuario nao autenticado.",
    });
  });

  it("[Caso de Teste 04.05] - Consulta de estoque com token JWT invalido", async () => {
    const response = await request(app)
      .get("/api/stock/doses")
      .set("Authorization", "Bearer token_invalido_ou_expirado");

    expect(response.status).to.equal(401);
    expect(response.body).to.deep.equal({
      error: "Usuario nao autenticado.",
    });
  });

  it("[Caso de Teste 04.06] - Consulta de estoque com dados atualizados apos retirada", async () => {
    const token = await createAuthenticatedUser();

    await request(app)
      .post("/api/withdrawals")
      .set("Authorization", `Bearer ${token}`)
      .send({ quantity: 1 });

    const response = await request(app)
      .get("/api/stock/doses")
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).to.equal(200);
    expect(response.body).to.deep.equal({
      availableDoses: 49,
      availableGrams: 4900,
      doseSizeGrams: 100,
      status: "AVAILABLE",
    });
  });
});
