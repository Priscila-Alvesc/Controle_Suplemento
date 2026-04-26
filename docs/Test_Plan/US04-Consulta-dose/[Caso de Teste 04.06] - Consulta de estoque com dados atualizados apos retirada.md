Objetivo: Retornar quantidade atualizada de doses após uma retirada realizada

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