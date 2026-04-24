[Caso de Teste 02.01] - Login com credenciais válidas

Título: Autenticar usuário com e-mail e senha corretos
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


[Caso de Teste 02.05] - Login com senha incorreta

Título: Rejeitar login quando senha está incorreta

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



[Caso de Teste 02.08] - Login com serviço indisponível

Título: Retornar erro 503 quando serviço está temporariamente indisponível

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