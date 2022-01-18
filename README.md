# Minato

Um pequeno projeto que estou fazendo para um restaurante, visando o atendimento via delivery, local e take away unificados numa mesma plataforma. 

Tecnologias utilizadas:
 - .NET 6.0 (Core)
 - Angular 13
 - Entity Framework Core
 - SQL Server
 
 O que você vai encontrar por aqui:
 - tabelas editáveis
 - colorPicker editável
 - auto complete de cep
 - integração com API do Google para prover distância e tempo de entrega
 - métodos de fácil leitura (ao menos tentei deixar tudo o mais simples possível)

Em Implementação:
- web socket

 Intruções para a execução do projeto:
  - Instale o node (https://nodejs.org/)
  - Usando o cmd navegue até a pasta ClientApp
  - Execute o comando 'npm i' e depois 'npm start'
  - Instale o .Net Core (https://dotnet.microsoft.com/download)
  - Crie um novo bano de dados chamado Minato no seu SQL Server
  - Abra o projeto no Visual Studio
  - Utilizando o Gernciador de Pacotes do Visual Studio execute o comando 'Update-Database'
  - Execute o projeto pelo ISS Express do Visual Studio (ou a ferramenta que você achar melhor)
  
  *talvez seja necessário alterar a string de conexão com o banco de dados, ela está no arquivo appSettings.json, na pasta Minato do projeto*
  
  Qualquer dúvida me contate no LinkedIn -> https://www.linkedin.com/in/thalita-carvalho-956337193/
