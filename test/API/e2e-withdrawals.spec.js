const {
  app,
  request,
  resetState,
  createAuthenticatedUser,
} = require("../helpers/apiTestHelper");

describe("E2E - Retirada e historico diario", () => {
  beforeEach(() => {
    resetState();
  });

  it("[Caso de Teste E2E] - Retirada bem-sucedida registra identificador do usuario", async () => {
    const token = await createAuthenticatedUser();

    const postResponse = await request(app)
      .post("/api/withdrawals")
      .set("Authorization", `Bearer ${token}`)
      .send({ quantity: 1 });

    const getResponse = await request(app)
      .get("/api/withdrawals/daily")
      .set("Authorization", `Bearer ${token}`);

    expect(postResponse.status).to.equal(201);
    expect(getResponse.status).to.equal(200);
    expect(getResponse.body.userId).to.equal(postResponse.body.userId);
    expect(getResponse.body.withdrawals[0].id).to.equal(postResponse.body.id);
  });

  it("[Caso de Teste E2E] - Retirada bem-sucedida registra data correta", async () => {
    const token = await createAuthenticatedUser();

    const postResponse = await request(app)
      .post("/api/withdrawals")
      .set("Authorization", `Bearer ${token}`)
      .send({ quantity: 1 });

    const getResponse = await request(app)
      .get("/api/withdrawals/daily")
      .set("Authorization", `Bearer ${token}`);

    expect(postResponse.status).to.equal(201);
    expect(getResponse.status).to.equal(200);
    expect(getResponse.body.date).to.equal(postResponse.body.withdrawnAt.slice(0, 10));
  });
});
