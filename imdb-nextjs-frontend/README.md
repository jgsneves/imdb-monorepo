<p align="center">
  <a href="https://nextjs.org/" target="blank"><img src="https://seeklogo.com/images/N/next-js-logo-7929BCD36F-seeklogo.com.png" width="200" alt="Next Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">Esta aplicação utiliza o framework NextJS que implementa as funcionalidades do <a href="https://react.dev/" target="_blank">ReactJS</a>, com o fim de construir uma aplicação frontend com segurança e boas práticas.</p>
    <p align="center">
    
## Descrição
Este repositório codifica uma aplicação frontend, que tem o intuito de consumir os dados da RESTful API produzida por [este repositório](https://github.com/jgsneves/imdb-nestjs-api), com as seguintes funcionalidades:
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
Este comando criará um container que buildará a aplicação NextJS em `localhost:3002`.

### Sem utilizar docker
Após clonar este repositório para seu ambiente local, deve instalar todas as bibliotecas através do seguinte comando:
```bash
$ npm install
```
O arquivo `.env` na raiz do projeto já foi criado e deve ser utilizado em ambiente de desenvolvimento.

## Iniciando o APP
Caso opte por utilizar `docker`, a aplicação já estará exposta com a criação dos containers. Caso contrário, deverá utilizar algum dos comandos abaixo para iniciar a aplicação em uma das portas de seu computador:
```bash
# Start com hot reload
$ npm run dev

# Start após o build
$ npm run start:dev

# Build da aplicação
$ npm run build
```
## Para testar
Importante ressaltar que o fim deste repositório é de apenas expor o conhecimento do programador-autor deste projeto. Com isso em mente, nem todos os testes unitários e de integração foram implementados. Porém, em um cenário real, o ideal é que todas as features sejam testadas através de testes de integração.
```bash
# para testar a aplicação
$ npm run test
```

## Tecnologias utilizadas

 1. [NextJS](https://nestjs.com/): um framework que utiliza ReactJS para renderizar a árvore do DOM, cuidando nativamente de quetões como rotas, performance com a utilização de estratégias como renderização em suspense (o JS é entregado para o cliente sob demanda), dentre outras funcionalidades.
 2. [Redux](https://redux.js.org/): a library de gerenciamento de estado mais utilizada no ecossistema React. Com ela, podemos persistir dados globais na aplicação, podendo utilizá-la em suites de testes, server-side e client-side.
 3. [ReactJS](https://react.dev/): biblioteca consolidada na renderização de aplicações frontend. Manipulação de DOM através de um virtual DOM com uma ótima DX.
 4. [Typescript](https://www.typescriptlang.org/): super-set de javascript, uma linguagem de programação fortemente tipada que é construída sobre o Javascript, complementa a linguagem para introduzir tipagem estática, segurança no desenvolvimento e uma intellisense mais descritiva.
 5. [Jest](https://jestjs.io/pt-BR/): framework de teste Javascript amplatamente utilizado no mercado.
 6. [Formik](https://formik.org/): biblioteca de validação de formulário. Impede que o usuário manipule dados inválidos para a API, além de trazer um feedback interessante ao usuário no preenchimento do formulário.
 7. [Docker](https://www.docker.com/): utilizar containers garante que o ambiente em que a aplicação é executada é isolado e facilmente replicado. 
 8. [Chakra-UI](https://chakra-ui.com/): framework de CSS com componentes visuais já prontos para o uso, agilizando o desenvolvimento.

## Variáveis de Ambiente
Por questões de segurança, não é recomendado compartilhar os segredos dentro do código, nem inserir o arquivo `.env` dentro do git. Porém, para fins de facilitar o clone do projeto, o arquivo `.env` foi compartilhado com esse repositório.
