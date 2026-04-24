[Caso de Teste 06.01] - Retirada bem-sucedida de 1 dose

Título: Registrar retirada de 1 dose com sucesso

Operação: POST /api/withdrawals
Headers:
Code
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

Corpo da Requisição:
JSON
  {
    "quantity": 1
  }

Status Code Esperado: 201 Retirada registrada com sucesso

Corpo da Resposta Esperado:
  JSON
  {
    "id": "8acfe90c-d0b3-4c17-90f8-a6dbd01b278a",
    "userId": "5f3b9e8f-3124-4d1f-9d9f-9082ab7d1c41",
    "quantity": 1,
    "consumedGrams": 100,
    "remainingDoses": 49,
    "withdrawnAt": "2026-04-24T14:30:00Z"
  }
Pré-condição: Usuário autenticado, estoque com 50 doses (5000 gramas), dentro do limite diário de 4 doses

[Caso de Teste 06.02] - Retirada rejeitada com quantidade 0

Título: Rejeitar retirada quando quantidade é 0

Operação: POST /api/withdrawals
Headers:

Code
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
Corpo da Requisição:
JSON
  {
    "quantity": 0
  }

Status Code Esperado: 400 Bad Request

Corpo da Resposta Esperado:
JSON
  {
    "error": "Quantidade inválida para retirada.",
    "details": [
      {
        "field": "quantity",
        "message": "Apenas 1 dose por solicitação é permitida."
      }
    ]
  }

[Caso de Teste 06.03] - Retirada rejeitada com quantidade 2

Título: Rejeitar retirada quando quantidade é superior a 1

Operação: POST /api/withdrawals
Headers:
Code
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

Corpo da Requisição:
JSON
  {
    "quantity": 2
  }

Status Code Esperado: 400 Bad Request

Corpo da Resposta Esperado:
JSON
  {
    "error": "Quantidade inválida para retirada.",
    "details": [
      {
        "field": "quantity",
        "message": "Apenas 1 dose por solicitação é permitida."
      }
    ]
  }

[Caso de Teste 06.06] - Retirada rejeitada sem autenticação (token ausente)

Título: Negar retirada quando usuário não está autenticado

Operação: POST /api/withdrawals
Headers: (sem Authorization)

Corpo da Requisição:
JSON
  {
    "quantity": 1
  }

Status Code Esperado: 401 Unauthorized

Corpo da Resposta Esperado:
JSON
  {
    "error": "Usuário não autenticado."
  }