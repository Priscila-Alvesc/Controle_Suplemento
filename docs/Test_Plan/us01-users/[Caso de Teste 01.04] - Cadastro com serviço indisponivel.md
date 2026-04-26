Objetivo: Retornar erro 503 quando serviço está temporariamente indisponível

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