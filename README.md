# API de Controle de Suplementos

API REST em Node.js e Express para controle de estoque e retirada diária de suplementos. A aplicação usa armazenamento em memória e segue o contrato documentado em [docs/swagger.yaml](docs/swagger.yaml).

## Links do Projeto

- Wiki: <https://github.com/Priscila-Alvesc/Controle_Suplemento/wiki/Controle-de-Suplemento>
- Issues: <https://github.com/Priscila-Alvesc/Controle_Suplemento/issues>
- Plano de testes: [docs/Test_Plan](docs/Test_Plan)

## Requisitos

- Node.js 22+
- npm
- k6, para executar os testes de performance da pasta [test/K6](test/K6)

## Instalação

```bash
npm install
```

## Como Executar

Para iniciar a API em `http://localhost:3000`:

```bash
npm start
```

Para desenvolvimento com recarregamento automático:

```bash
npm run dev
```

A documentação Swagger fica disponível em:

```text
http://localhost:3000/docs
```

O endpoint de saúde fica disponível em:

```text
http://localhost:3000/health
```

## Scripts de Teste

Executa todos os testes configurados no projeto:

```bash
npm test
```

O comando acima executa:

```bash
npm run test:all
```

Executa somente os testes automatizados de API com Mocha:

```bash
npm run test:api:spec
```

Executa os testes de API com relatório Mochawesome:

```bash
npm run test:api
```

Executa os testes de performance com k6:

```bash
npm run test:k6
```

Importante: para executar `npm test`, a API deve estar rodando em `http://localhost:3000`, pois o teste k6 consome a aplicação via HTTP.

## Endpoints

- `GET /health`
- `GET /docs`
- `POST /api/users`
- `POST /api/auth/login`
- `GET /api/stock/doses`
- `POST /api/withdrawals`
- `GET /api/withdrawals/daily`

## Regras Implementadas

- Cadastro de usuário com e-mail único.
- Autenticação com JWT.
- Consulta de estoque protegida por token.
- Retirada de apenas 1 dose por solicitação.
- Limite de 4 retiradas por usuário por dia.
- Controle de estoque em memória considerando 100g por dose.
- Estoque inicial de 5000g.
- Respostas de erro padronizadas.

## Variáveis de Ambiente

- `PORT`: porta da aplicação. Valor padrão: `3000`.
- `JWT_SECRET`: segredo usado para assinar o token JWT. Possui valor padrão para desenvolvimento local.
- `FORCE_UNAVAILABLE`: quando definido como `true`, força resposta `503` para simular indisponibilidade.

## Estrutura Principal

```text
src/
  app.js
  server.js
  config/
  data/
  middlewares/
  routes/
  services/
  utils/

test/
  API/
  K6/
  helpers/

docs/
  swagger.yaml
  Test_Plan/
```

## Observações de Qualidade

Os testes de API cobrem cadastro, autenticação, estoque, retirada, limite diário e fluxo E2E. Os testes de performance usam k6 e geram relatório HTML em:

```text
test-results/k6/performance-report.html
```
