Objetivo: Rejeitar retirada quando quantidade é 0

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