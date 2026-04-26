Objetivo: Autenticar usuário com e-mail e senha corretos
Operação: POST /api/auth/login
Corpo da Requisição:
JSON
    {
    "email": "priscila.alves@email.com",
    "password": "123456"
    }

Status Code Esperado: 200 OK

Corpo da Resposta Esperado:
JSON
    {
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "tokenType": "Bearer",
    "expiresIn": 3600
    }