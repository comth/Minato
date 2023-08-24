# Minato
Essa branch é dedicada ao esforço de atualizar esse projeto via um MAC com M1, o que está parecendo impossível.

.NET é multiplataforma, mas aparentemente somente para execução ou pequenos ajustes de código

Problemas encontrados até agora:
- quando precisei rodar o Update-Database descobri que o Package Manager não funciona no mac
  - diante disso tentei usar o dotnet ef update database, ainda sem sucesso
- desisti do banco de dados, tentei ir direto para atualizar para o .NET 7 ou 8
  - tentei usar o upgrade assistant, mas ele não funciona no mac

Possíveis novas abordagens
- usar o vs code com algumas extensões para ajudar na atualização
- fazer a atualização no dedo
- testar o banco de dados in memory do ef core
