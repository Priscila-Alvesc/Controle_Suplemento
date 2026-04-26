Objetivo: Rejeitar login quando senha está incorreta

Operação: POST /api/auth/login

Corpo da Requisição:
JSON
    {
    "email": "priscila.alves@email.com",
    "password": "senhaerrada"
    }

Status Code Esperado: 401 Unauthorized

Corpo da Resposta Esperado:
JSON
    {
    "error": "Credenciais inválidas."
    }