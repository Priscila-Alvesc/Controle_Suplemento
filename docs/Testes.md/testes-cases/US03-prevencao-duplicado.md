[Caso de Teste 03.01] - Cadastro com e-mail já existente (primeiro cadastro)

Título: Rejeitar segundo cadastro com e-mail duplicado

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
Pré-condição: Existe um usuário cadastrado com o e-mail "priscila.alves@email.com"

[Caso de Teste 03.02] - Cadastro duplicado com e-mail em case diferente (sensibilidade)

Título: Validar se o sistema considera variações de maiúsculas/minúsculas como duplicado

Operação: POST /api/users

Corpo da Requisição:
JSON
    {
    "name": "Maria Santos",
    "email": "PRISCILA.ALVES@EMAIL.COM",
    "password": "senha456"
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
Pré-condição: Existe um usuário cadastrado com o e-mail "priscila.alves@email.com"