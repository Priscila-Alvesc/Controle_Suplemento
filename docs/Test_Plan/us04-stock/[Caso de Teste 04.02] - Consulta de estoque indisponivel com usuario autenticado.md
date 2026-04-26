Objetivo: Retornar status UNAVAILABLE quando estoque está zerado

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