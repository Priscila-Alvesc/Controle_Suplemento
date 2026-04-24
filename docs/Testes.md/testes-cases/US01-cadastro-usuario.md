[Caso de Teste 01.01] - Cadastro com dados válidos

Título: Cadastrar novo usuário com informações corretas

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


[Caso de Teste 01.02] - Cadastro sem campo obrigatório "email"

Título: Rejeitar cadastro quando campo e-mail não é informado
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

[Caso de Teste 01.03] - Cadastro duplicado com mesmo e-mail

Título: Rejeitar cadastro quando e-mail já existe na base
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

[Caso de Teste 01.04] - Cadastro com serviço indisponível
Título: Retornar erro 503 quando serviço está temporariamente indisponível
Operação: POST /api/users
Corpo da Requisição:
JSON
{
  "name": "Lucas Ferreira",
  "email": "lucas@email.com",
  "password": "123456"
}
Status Code Esperado: 503 Service Unavailable
Corpo da Resposta Esperado:
JSON
{
  "error": "Serviço temporariamente indisponível."
}