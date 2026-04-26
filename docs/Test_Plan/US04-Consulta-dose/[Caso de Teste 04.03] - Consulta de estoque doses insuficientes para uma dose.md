Objetivo: Retornar status UNAVAILABLE quando estoque está abaixo de 100 gramas

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