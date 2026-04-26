Operação: POST /api/withdrawals
Headers: (sem Authorization)a

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