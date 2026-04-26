const {
  app,
  request,
  resetState,
  createAuthenticatedUser,
} = require("./helpers/apiTestHelper");

async function withdrawNTimes(token, times) {
  for (let index = 0; index < times; index += 1) {
    await request(app)
      .post("/api/withdrawals")
      .set("Authorization", `Bearer ${token}`)
      .send({ quantity: 1 });
  }
}

describe("US06 - Limite diario de retiradas", () => {
  beforeEach(() => {
    resetState();
  });

  it("[Caso de Teste 07.01] - Primeira retirada do dia", async () => {
    const token = await createAuthenticatedUser();
    const response = await request(app)
      .post("/api/withdrawals")
      .set("Authorization", `Bearer ${token}`)
      .send({ quantity: 1 });

    expect(response.status).to.equal(201);
    expect(response.body.remainingDoses).to.equal(49);
  });

  it("[Caso de Teste 07.02] - Segunda retirada do dia", async () => {
    const token = await createAuthenticatedUser();
    await withdrawNTimes(token, 1);

    const response = await request(app)
      .post("/api/withdrawals")
      .set("Authorization", `Bearer ${token}`)
      .send({ quantity: 1 });

    expect(response.status).to.equal(201);
    expect(response.body.remainingDoses).to.equal(48);
  });

  it("[Caso de Teste 07.03] - Terceira retirada do dia", async () => {
    const token = await createAuthenticatedUser();
    await withdrawNTimes(token, 2);

    const response = await request(app)
      .post("/api/withdrawals")
      .set("Authorization", `Bearer ${token}`)
      .send({ quantity: 1 });

    expect(response.status).to.equal(201);
    expect(response.body.remainingDoses).to.equal(47);
  });

  it("[Caso de Teste 07.04] - Quarta retirada do dia", async () => {
    const token = await createAuthenticatedUser();
    await withdrawNTimes(token, 3);

    const response = await request(app)
      .post("/api/withdrawals")
      .set("Authorization", `Bearer ${token}`)
      .send({ quantity: 1 });

    expect(response.status).to.equal(201);
    expect(response.body.remainingDoses).to.equal(46);
  });

  it("[Caso de Teste 07.05] - Quinta retirada rejeitada", async () => {
    const token = await createAuthenticatedUser();
    await withdrawNTimes(token, 4);

    const response = await request(app)
      .post("/api/withdrawals")
      .set("Authorization", `Bearer ${token}`)
      .send({ quantity: 1 });

    expect(response.status).to.equal(409);
    expect(response.body).to.deep.equal({
      error: "Limite diario de doses excedido.",
    });
  });

  it("[Caso de Teste 07.06] - Consulta de historico diario com 2 retirada", async () => {
    const token = await createAuthenticatedUser();
    await withdrawNTimes(token, 2);

    const response = await request(app)
      .get("/api/withdrawals/daily")
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).to.equal(200);
    expect(response.body.totalWithdrawals).to.equal(2);
    expect(response.body.totalConsumedGrams).to.equal(200);
    expect(response.body.remainingDailyLimit).to.equal(2);
    expect(response.body.withdrawals).to.have.lengthOf(2);
  });

  it("[Caso de Teste 07.07] - Consulta de historico diario com limite atingido", async () => {
    const token = await createAuthenticatedUser();
    await withdrawNTimes(token, 4);

    const response = await request(app)
      .get("/api/withdrawals/daily")
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).to.equal(200);
    expect(response.body.totalWithdrawals).to.equal(4);
    expect(response.body.totalConsumedGrams).to.equal(400);
    expect(response.body.remainingDailyLimit).to.equal(0);
    expect(response.body.withdrawals).to.have.lengthOf(4);
  });
});
