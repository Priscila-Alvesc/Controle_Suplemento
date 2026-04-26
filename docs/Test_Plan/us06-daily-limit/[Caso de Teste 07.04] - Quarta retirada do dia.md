Objetivo: Permitir quarta retirada quando usuário tem 3 retiradas no dia (atingindo limite)
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
    "id": "d8e0f3a5-6b2c-5d9f-c4g0-3e9f0g4b5c6d",
    "userId": "5f3b9e8f-3124-4d1f-9d9f-9082ab7d1c41",
    "quantity": 1,
    "consumedGrams": 100,
    "remainingDoses": 46,
    "withdrawnAt": "2026-04-24T18:30:00Z"
    }
Pré-condição: Usuário já retirou 3 doses no dia corrente