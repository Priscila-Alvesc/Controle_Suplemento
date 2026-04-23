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
