const {
  app,
  request,
  resetState,
  createAuthenticatedUser,
} = require("./helpers/apiTestHelper");

describe("US05 - Retirada unitaria", () => {
  beforeEach(() => {
    resetState();
  });

  it("[Caso de Teste 06.01] - Retirada bem-sucedida de 1 dose", async () => {
    const token = await createAuthenticatedUser();
    const response = await request(app)
      .post("/api/withdrawals")
      .set("Authorization", `Bearer ${token}`)
      .send({ quantity: 1 });

    expect(response.status).to.equal(201);
    expect(response.body).to.include({
      quantity: 1,
      consumedGrams: 100,
      remainingDoses: 49,
    });
    expect(response.body.id).to.be.a("string");
    expect(response.body.userId).to.be.a("string");
    expect(response.body.withdrawnAt).to.be.a("string");
  });

  it("[Caso de Teste 06.02] - Retirada rejeitada com quantidade 0", async () => {
    const token = await createAuthenticatedUser();
    const response = await request(app)
      .post("/api/withdrawals")
      .set("Authorization", `Bearer ${token}`)
      .send({ quantity: 0 });

    expect(response.status).to.equal(400);
    expect(response.body.error).to.equal("Quantidade invalida para retirada.");
    expect(response.body.details).to.be.an("array");
  });

  it("[Caso de Teste 06.03] - Retirada rejeitada com quantidade 2", async () => {
    const token = await createAuthenticatedUser();
    const response = await request(app)
      .post("/api/withdrawals")
      .set("Authorization", `Bearer ${token}`)
      .send({ quantity: 2 });

    expect(response.status).to.equal(400);
    expect(response.body.error).to.equal("Quantidade invalida para retirada.");
    expect(response.body.details).to.be.an("array");
  });

  it("[Caso de Teste 06.06] - Retirada rejeitada sem autenticacao", async () => {
    const response = await request(app).post("/api/withdrawals").send({ quantity: 1 });

    expect(response.status).to.equal(401);
    expect(response.body).to.deep.equal({
      error: "Usuario nao autenticado.",
    });
  });
});
