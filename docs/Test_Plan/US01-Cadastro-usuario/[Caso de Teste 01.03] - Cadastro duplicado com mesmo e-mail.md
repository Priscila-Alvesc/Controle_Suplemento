Objetivo: Rejeitar cadastro quando e-mail já existe na base

Operação: POST /api/users

Corpo da Requisição:
JSON
    {
    "name": "Priscila Alves",
    "email": "priscila.alves@email.com",
    "password": "123456"
    }

Status Code Esperado: 409 Conflict

Corpo da Resposta Esperado:
JSON
    {
    "error": "Usuário já cadastrado.",
    "details": [
        {
        "field": "email",
        "message": "Já existe um usuário com o e-mail informado."
        }
    ]
    }