Objetivo: Permitir terceira retirada quando usuário tem 2 retiradas no dia

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
    "id": "c7d9e2f4-5a1b-4c8e-b3f9-2d8e9f3a4b5c",
    "userId": "5f3b9e8f-3124-4d1f-9d9f-9082ab7d1c41",
    "quantity": 1,
    "consumedGrams": 100,
    "remainingDoses": 47,
    "withdrawnAt": "2026-04-24T16:45:00Z"
    }
Pré-condição: Usuário já retirou 2 doses no dia corrente