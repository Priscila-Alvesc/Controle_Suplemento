# Testes de Performance com K6

Este diretório contém os testes automatizados de performance que cobrem os endpoints definidos em `docs/swagger.yaml`.

## Cobertura de endpoints

- `POST /api/users`
- `POST /api/auth/login`
- `GET /api/stock/doses`
- `POST /api/withdrawals`
- `GET /api/withdrawals/daily`

## Execução

Com a API rodando localmente em `http://localhost:3000`:

```bash
npm run test:k6
```

Opcionalmente, para outro host:

```bash
BASE_URL=http://localhost:3000 npm run test:k6
```

## Relatório HTML

Após a execução, o relatório é gerado em:

- `test-results/k6/performance-report.html`
