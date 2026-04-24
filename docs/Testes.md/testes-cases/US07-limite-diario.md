[Caso de Teste 07.01] - Primeira retirada do dia (dentro do limite)

Título: Permitir primeira retirada quando usuário não atingiu limite diário

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

[Caso de Teste 07.02] - Segunda retirada do dia (dentro do limite)

Título: Permitir segunda retirada quando usuário tem apenas 1 retirada no dia

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

[Caso de Teste 07.03] - Terceira retirada do dia (dentro do limite)

Título: Permitir terceira retirada quando usuário tem 2 retiradas no dia

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

[Caso de Teste 07.04] - Quarta retirada do dia (último limite permitido)

Título: Permitir quarta retirada quando usuário tem 3 retiradas no dia (atingindo limite)
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

[Caso de Teste 07.05] - Quinta retirada rejeitada (limite excedido)

Título: Rejeitar quinta retirada quando usuário já atingiu limite de 4 doses no dia

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

Título: Permitir retirada em novo dia mesmo após atingir limite no dia anterior

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

[Caso de Teste 07.06] - Consulta de histórico diário com 2 retiradas

Título: Retornar histórico diário correto com 2 retiradas registradas

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

[Caso de Teste 07.07] - Consulta de histórico diário com limite atingido

Título: Retornar histórico diário com 4 retiradas (limite máximo atingido)

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
    "totalWithdrawals": 4,
    "totalConsumedGrams": 400,
    "remainingDailyLimit": 0,
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
        },
        {
        "id": "c7d9e2f4-5a1b-4c8e-b3f9-2d8e9f3a4b5c",
        "quantity": 1,
        "consumedGrams": 100,
        "withdrawnAt": "2026-04-24T16:45:00Z"
        },
        {
        "id": "d8e0f3a5-6b2c-5d9f-c4g0-3e9f0g4b5c6d",
        "quantity": 1,
        "consumedGrams": 100,
        "withdrawnAt": "2026-04-24T18:30:00Z"
        }
    ]
    }
Validação Esperada: remainingDailyLimit = 0 (limite atingido)