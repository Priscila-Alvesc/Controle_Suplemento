Objetivo: Negar acesso quando token JWT é inválido ou expirado

Operação: GET /api/stock/doses
Headers:
Code
Authorization: Bearer token_invalido_ou_expirado

Corpo da Requisição: (não possui)
Status Code Esperado: 401 Unauthorized

Corpo da Resposta Esperado:
JSON
    {
    "error": "Usuário não autenticado."
    }