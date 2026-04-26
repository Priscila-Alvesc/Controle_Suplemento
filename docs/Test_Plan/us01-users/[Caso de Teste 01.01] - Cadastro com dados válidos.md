Objetivo: Cadastrar novo usuário com informações corretas

Operação: POST /api/users

Corpo da Requisição:
JSON
        {
        "name": "Priscila Alves",
        "email": "priscila.alves@email.com",
        "password": "123456"
        }
Status Code Esperado: 201 Created
Corpo da Resposta Esperado:
JSON
    {
    "id": "5f3b9e8f-3124-4d1f-9d9f-9082ab7d1c41",
    "name": "Priscila Alves",
    "email": "priscila.alves@email.com",
    "createdAt": "2026-04-23T12:00:00Z"
    }