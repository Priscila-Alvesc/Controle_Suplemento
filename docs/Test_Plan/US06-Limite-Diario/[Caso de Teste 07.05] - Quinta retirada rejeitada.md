Objetivo: Rejeitar quinta retirada quando usuário já atingiu limite de 4 doses no dia

Operação: POST /api/withdrawals
Headers:

Code
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

Corpo da Requisição:
JSON
    {
    "quantity": 1
    }
Status Code Esperado: 409 Conflict

Corpo da Resposta Esperado:
JSON
    {
    "error": "Limite diário de doses excedido."
    }
Pré-condição: Usuário já retirou 4 doses no dia corrente

[Caso de Teste 07.06] - Retirada permitida após meia-noite (novo dia)

Objetivo: Permitir retirada em novo dia mesmo após atingir limite no dia anterior

Operação: POST /api/withdrawals (no dia seguinte)
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
    "id": "e9f1a4b6-7c3d-6e0g-d5h1-4f0g1h5c6d7e",
    "userId": "5f3b9e8f-3124-4d1f-9d9f-9082ab7d1c41",
    "quantity": 1,
    "consumedGrams": 100,
    "remainingDoses": 45,
    "withdrawnAt": "2026-04-25T08:00:00Z"
    }
Pré-condição: Usuário atingiu limite (4 doses) no dia anterior (2026-04-24), tentativa de retirada em novo dia (2026-04-25)