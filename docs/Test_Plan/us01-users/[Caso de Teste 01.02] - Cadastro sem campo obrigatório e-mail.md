Objetivo: Rejeitar cadastro quando campo e-mail não é informado

Operação: POST /api/users
Corpo da Requisição:
JSON
    {
    "name": "João Silva",
    "password": "123456"
    }
Status Code Esperado: 400 Bad Request

Corpo da Resposta Esperado:
JSON
    {
    "error": "Dados de entrada inválidos.",
    "details": [
        {
        "field": "email",
        "message": "O e-mail informado e invalido."
        }
    ]
    }