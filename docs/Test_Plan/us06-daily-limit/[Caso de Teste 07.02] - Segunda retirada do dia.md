Objetivo: Permitir segunda retirada quando usuário tem apenas 1 retirada no dia

Operação: POST /api/withdrawals
Headers:

Code
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

Corpo da Requisição:
JSON
    {
    "quantity": 1
    }

Status Code Esperado: 201 Created

Corpo da Resposta Esperado:
JSON
    {
    "id": "8acfe90c-d0b3-4c17-90f8-a6dbd01b278a",
    "userId": "5f3b9e8f-3124-4d1f-9d9f-9082ab7d1c41",
    "quantity": 1,
    "consumedGrams": 100,
    "remainingDoses": 48,
    "withdrawnAt": "2026-04-24T12:15:00Z"
    }

Pré-condição: Usuário já retirou 1 dose no dia corrente