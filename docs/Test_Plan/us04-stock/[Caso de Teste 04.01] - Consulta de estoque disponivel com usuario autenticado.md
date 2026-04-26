Objetivo: Retornar quantidade de doses disponíveis para usuário autenticado

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