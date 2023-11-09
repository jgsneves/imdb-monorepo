<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">Esta aplicação utiliza o framework NestJS que abstrai as funcionalidades do <a href="http://nodejs.org" target="_blank">Node.js</a>, com o fim de construir uma API eficiente e escalável.</p>
    <p align="center">
    
## Descrição
Este repositório codifica uma RESTful API com as seguintes funcionalidades:
### 1) Gerenciamento de entidade Usuário, com privilégio de acesso para Admins
Nesta aplicação é possível criar, editar, realizar exclusão lógica (desativar) e receber uma lista com todos os Usuários cadastrados na plataforma. Há também privilégio de acesso para usuários com a função `Admin`, sendo possível apenas para estes últimos o cadastro de novos usuários.
### 2) Autenticação Bearer Token para endpoints sensíveis
Alguns endoints, como os disponíveis para o gerenciamento de Usuários e também os relativos a cadastro, edição e deleção de Filmes são protegidos por autenticação simples, na modalidade `Bearer Token`.
### 2) Gerenciamento de entidade Filme
Filmes podem ser cadastrados nesta API, além de serem editados ou deletados. A leitura da lista de filmes e o acesso a maiores detalhes de cada filme são endpoints públicos.
### 3) Pontuação de filmes em uma escala de 0 a 4
Usuários cadastrados e logados podem votar nos filmes em uma classificação que varia de 0 a 4 pontos. Há a disponibilidade também de um endpoint com a pontuação média de cada filme.

## Como instalar este repositório?
### Utilizando docker
Primeiramente você deve clonar este repositório em sua máquina local. Possuindo docker instalado em sua máquina (caso utilize windows, deve utilizar o WSL), execute o seguinte comando:
```bash
$ docker-compose up -d
```
Este comando criará dois containers: um para o postegres e outro para a API. A api estará exposta no endereço `localhost:3000`.

### Sem utilizar docker

Você deve possuir um banco de dados `postgres` local (ou na nuvem) que possa receber a conexão do `PrismaORM` deste projeto. A recomendação é utilizar [docker](https://hub.docker.com/_/postgres) para encapsular a lógica do banco dentro de um container.

Após clonar este repositório para seu ambiente local, deve instalar todas as bibliotecas através do seguinte comando:
```bash
$ npm install
```
O arquivo `.env` na raiz do projeto já foi criado e deve ser utilizado em ambiente de desenvolvimento.

## Iniciando o APP
Caso opte por utilizar `docker`, a aplicação já estará exposta com a criação dos containers. Caso contrário, deverá utilizar algum dos comandos abaixo para iniciar a aplicação em uma das portas de seu computador:
```bash
# Após o build, localmente
$ npm run start

# Com o Watch Mode
$ npm run start:dev

# Em produção
$ npm run start:prod
```

## Usuário admin inicial
Após iniciar os containers, as migrations serão aplicadas automaticamente. Para criar um primeiro usuário admin, execute o seguinte comando, onde `<id do container>` é o ID do container da api, que tem nome `nest-api`:
```bash
$ docker exec <id do container> npx prisma db seed
```
Após, é possível realizar login na plataforma através do endpoint de login ou através do frontend, com o seguinte usuário:
```JSON
{
	"email": "admin@gmail.com",
	"senha": "Senha@13456&"
}
```
Caso não utilize `docker`, execute o comando abaixo:
```bash
npx prisma db seed
```
## Para testar
Importante ressaltar que o fim deste repositório é de apenas expor o conhecimento do programador-autor deste projeto. Com isso em mente, apenas os testes unitários e de integração referentes à funcionalidade `Movies` foram implementados. Porém, em um cenário real, o ideal é que todos os endpoints sejam testados tanto unitariamente como através de testes de integração.
```bash
# testes unitários
$ npm run test

# testes e2e
$ npm run test:e2e

# coverage
$ npm run test:cov
```

## Tecnologias utilizadas

 1. [NestJS](https://nestjs.com/): um framework robusto que utiliza NodeJS e [ExpressJS](https://expressjs.com/pt-br/) por debaixo dos panos, misturando toda a versatilidade do Node com a segurança de uma arquitetura voltada para a [Injeção de Dependência](https://en.wikipedia.org/wiki/Dependency_injection). O Nest lembra muito a forma de trabalhar de grandes frameworks já consolidados como o .NET.
 2. [PrismaORM](https://www.prisma.io/): uma library para NodeJS que nos auxilia na conexão com um banco de dados, além da criação e utilização de queries e mutations, pensando sempre na segurança e escalabilidade da aplicação. Já vem com built-ins de segurança para prever SQL Injection, dentre outras funcionalidades.
 3. [bcrypt](https://www.npmjs.com/package/bcrypt): biblioteca consolidada para a encriptação de caracteres, utilizada para encriptar senhas que serão salvas no Banco de Dados.
 4. [Zod](https://zod.dev/): biblioteca criada para fazer validação e declaração de tipos, usando Typescript. Ela garante que a tipagem estática seja respeitada em tempo de execução (runtime).
 5. [Typescript](https://www.typescriptlang.org/): super-set de javascript, uma linguagem de programação fortemente tipada que é construída sobre o Javascript, complementa a linguagem para introduzir tipagem estática, segurança no desenvolvimento e uma intellisense mais descritiva.
 6. [Jest](https://jestjs.io/pt-BR/): framework de teste Javascript amplatamente utilizado no mercado.
 7. [Postegres](https://www.postgresql.org/): banco de dados open-source com ótimas features built-in, como enum scalar, array scalar, suporte a JSON, etc.
 8. [Docker](https://www.docker.com/): utilizar containers garante que o ambiente em que a aplicação é executada é isolado e facilmente replicado. Além disso, dá a possibilidade de executar a aplicação apenas se um container de banco de dados estiver ativo.

## Swagger/documentação
Após startar a aplicação, está disponível o swagger (OpenAPI) da API no seguinte endereço:
```bash
 localhost:3000/api/swagger
```

## Postman Collections
1. [Votes Collection](https://drive.google.com/file/d/1LY0rZNBRyUnvCMWpHVUdZGGoaphFbBJY/view?usp=drive_link)
2. [Users Collection](https://drive.google.com/file/d/1zx3VCiOTskBA-CwqTujxEQrUtJVU84vm/view?usp=drive_link)
3. [Movies Collection](https://drive.google.com/file/d/1RgCaF5AwNthhUe67BsAM6eQahyNoXBXd/view?usp=drive_link)
4. [Auth Collection](https://drive.google.com/file/d/1d60RsMYTIdKNdwxL1kznYeryj7nZbCrb/view?usp=drive_link)

## Variáveis de Ambiente
Por questões de segurança, não é recomendado compartilhar os segredos dentro do código, nem inserir o arquivo `.env` dentro do git. Porém, para fins de facilitar o clone do projeto, o arquivo `.env` foi compartilhado com esse repositório.
