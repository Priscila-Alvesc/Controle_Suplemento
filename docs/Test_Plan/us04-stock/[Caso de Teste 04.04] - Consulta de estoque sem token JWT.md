Objetivo: Negar acesso quando token JWT não é fornecido

Operação: GET /api/stock/doses
Headers: (sem Authorization)

Corpo da Requisição: (não possui)
Status Code Esperado: 401 Unauthorized

Corpo da Resposta Esperado:
JSON
    {
    "error": "Usuário não autenticado."
    }