Objetivo: Permitir primeira retirada quando usuário não atingiu limite diário

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
    "id": "a3978e85-3e2b-4e45-b8b7-06d0cb181fb5",
    "userId": "5f3b9e8f-3124-4d1f-9d9f-9082ab7d1c41",
    "quantity": 1,
    "consumedGrams": 100,
    "remainingDoses": 49,
    "withdrawnAt": "2026-04-24T08:00:00Z"
    }
Pré-condição: Novo dia, usuário sem retiradas registradas