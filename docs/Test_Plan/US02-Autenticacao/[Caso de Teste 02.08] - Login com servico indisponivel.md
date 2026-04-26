Objetivo: Retornar erro 503 quando serviço está temporariamente indisponível

Operação: POST /api/auth/login

Corpo da Requisição:
JSON
    {
    "email": "priscila.alves@email.com",
    "password": "123456"
    }

Status Code Esperado: 503 Service Unavailable

Corpo da Resposta Esperado:
JSON
    {
    "error": "Serviço temporariamente indisponível."
    }