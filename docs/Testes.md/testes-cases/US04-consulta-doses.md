[Caso de Teste 04.01] - Consulta de estoque com usuário autenticado (doses disponíveis)

Título: Retornar quantidade de doses disponíveis para usuário autenticado

Operação: GET /api/stock/doses

Headers:
Code
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

Corpo da Requisição: (não possui)

Status Code Esperado: 200 OK

Corpo da Resposta Esperado:
JSON
    {
    "availableDoses": 50,
    "availableGrams": 5000,
    "doseSizeGrams": 100,
    "status": "AVAILABLE"
    }
Validação Esperada: availableDoses = availableGrams / doseSizeGrams → 1 = 100 / 100
    
Pré-condição: Usuário autenticado com token JWT válido e estoque com 5000 gramas disponíveis

[Caso de Teste 04.02] - Consulta de estoque com usuário autenticado (sem doses disponíveis)

Título: Retornar status UNAVAILABLE quando estoque está zerado

Operação: GET /api/stock/doses
Headers:
Code
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

Corpo da Requisição: (não possui)
Status Code Esperado: 200 OK
Corpo da Resposta Esperado:
JSON
    {
    "availableDoses": 0,
    "availableGrams": 0,
    "doseSizeGrams": 100,
    "status": "UNAVAILABLE"
    }
Pré-condição: Usuário autenticado com token JWT válido e estoque com 0 gramas

[Caso de Teste 04.03] - Consulta de estoque com usuário autenticado (doses insuficientes para uma dose)

Título: Retornar status UNAVAILABLE quando estoque está abaixo de 100 gramas

Operação: GET /api/stock/doses
Headers:
Code
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

Corpo da Requisição: (não possui)
Status Code Esperado: 200 OK

Corpo da Resposta Esperado:
JSON
    {
    "availableDoses": 0,
    "availableGrams": 75,
    "doseSizeGrams": 100,
    "status": "UNAVAILABLE"
    }
Pré-condição: Usuário autenticado com token JWT válido e estoque com 75 gramas (inferior a 100)

[Caso de Teste 04.04] - Consulta de estoque sem token JWT

Título: Negar acesso quando token JWT não é fornecido

Operação: GET /api/stock/doses
Headers: (sem Authorization)

Corpo da Requisição: (não possui)
Status Code Esperado: 401 Unauthorized

Corpo da Resposta Esperado:
JSON
    {
    "error": "Usuário não autenticado."
    }

[Caso de Teste 04.05] - Consulta de estoque com token JWT inválido

Título: Negar acesso quando token JWT é inválido ou expirado

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



[Caso de Teste 04.06] - Consulta de estoque com dados atualizados após retirada
Título: Retornar quantidade atualizada de doses após uma retirada realizada
Operação: GET /api/stock/doses (após uma retirada prévia)
Headers:
Code
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
Corpo da Requisição: (não possui)
Status Code Esperado: 200 OK
Corpo da Resposta Esperado:
JSON
{
  "availableDoses": 49,
  "availableGrams": 4900,
  "doseSizeGrams": 100,
  "status": "AVAILABLE"
}
Pré-condição: Estoque inicial com 5000 gramas (50 doses), após retirada de 1 dose, estoque deve refletir 4900 gramas

[Caso de Teste 04.07] - Consulta de estoque com serviço indisponível

Título: Retornar erro 503 quando serviço está temporariamente indisponível
Operação: GET /api/stock/doses
Headers:
Code
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
Corpo da Requisição: (não possui)
Status Code Esperado: 503 Service Unavailable
Corpo da Resposta Esperado:
JSON
    {
    "error": "Serviço temporariamente indisponível."
    }