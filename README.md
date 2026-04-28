# GitHub diretório Wiki 
É possível termos acesso a especificação do èpico e regras de negócios

# Test Plan 
Implementação do plano de testes se encontra dentro do diretório Controle_Suplemento\docs\Test_Plan

# Github diretório Issues

O código original era:
function createUserWithdrawal(userId, payload) {
  const quantity = Number(payload.quantity);

  if (quantity !== 1) {
    throw new HttpError(400, "Quantidade inválida para retirada.", [
      {
        field: "quantity",
        message: "Apenas 1 dose por solicitação é permitida.",
      },
    ]);
  }
}

Ou seja, a regra de negócio exigia que apenas 1 dose fosse permitida por solicitação. Qualquer valor diferente de 1 gerava erro.

De forma proposital e didática, alteramos o código para:
function createUserWithdrawal(userId, payload) {
  const quantity = Number(payload.quantity);

  if (quantity !== 0) {
    throw new HttpError(400, "Quantidade inválida para retirada.", [
      {
        field: "quantity",
        message: "Apenas 1 dose por solicitação é permitida.",
      },
    ]);
  }
}

Essa mudança gera inconsistências, gerando o que contradiz a mensagem de erro e a regra de negócio.

Issues registrados na github para exemplicar abertura de bugs para tratativa da aplicação.

# API de Controle de Suplementos

Implementacao em JavaScript com Express e armazenamento em memoria baseada no contrato definido em `docs/swagger.yaml`.

## Requisitos

- Node.js 22+

## Como executar

```bash
npm install
npm start
```

A API sera iniciada porta localhost:3000`.

Documentação  API pode ser acessada via : http://localhost:3000/docs

## Endpoints

- `POST /api/users`
- `POST /api/auth/login`
- `GET /api/stock/doses`
- `POST /api/withdrawals`
- `GET /api/withdrawals/daily`

## Regras implementadas

- cadastro de usuario com e-mail unico;
- autenticacao com JWT;
- consulta de estoque protegido por token;
- retirada de apenas 1 dose por solicitacao;
- limite de 4 retiradas por usuario por dia;
- controle de estoque em memoria considerando 100g por dose;
- respostas de erro padronizadas.

## Variaveis de ambiente

- `PORT`: porta da aplicacao. Padrao `3000`.
- `JWT_SECRET`: segredo usado para assinar o token. Possui valor padrao para desenvolvimento local.