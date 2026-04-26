Objetivo: Retornar histórico diário correto com 2 retiradas registradas

Operação: GET /api/withdrawals/daily
Headers:

Code
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

Corpo da Requisição: (não possui)
Status Code Esperado: 200 OK

Corpo da Resposta Esperado:
JSON
{
  "userId": "5f3b9e8f-3124-4d1f-9d9f-9082ab7d1c41",
  "date": "2026-04-24",
  "totalWithdrawals": 2,
  "totalConsumedGrams": 200,
  "remainingDailyLimit": 2,
  "withdrawals": [
    {
      "id": "a3978e85-3e2b-4e45-b8b7-06d0cb181fb5",
      "quantity": 1,
      "consumedGrams": 100,
      "withdrawnAt": "2026-04-24T08:00:00Z"
    },
    {
      "id": "8acfe90c-d0b3-4c17-90f8-a6dbd01b278a",
      "quantity": 1,
      "consumedGrams": 100,
      "withdrawnAt": "2026-04-24T12:15:00Z"
    }
  ]
}
Validação Esperada: remainingDailyLimit = 4 - totalWithdrawals → 2 = 4 - 2