const express = require("express");
const cors = require("cors");
const { uuid } = require("uuidv4");

// const { v4: uuid } = require('uuid');

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  return response.json(repositories);
});

app.post("/repositories", (request, response) => {
  const {title, url, techs} = request.body;
  const repository = {
    id: uuid(),
    title,
    url,
    techs,
    likes: 0
  };
  repositories.push(repository);
  return response.json(repository);
});

app.put("/repositories/:id", (request, response) => {
  const {id} = request.params;
  const {title, url, techs} = request.body;
  const repository = repositories.find( repository => repository.id === id);
  if(repository == undefined){
    return response.status(400).json({error: 'Invalid Repository ID.'});    
  }
  repository.title = title;
  repository.url = url;
  repository.techs = techs;

  return response.json(repository);
});

app.delete("/repositories/:id", (request, response) => {
  const {id} = request.params;
  const repository = repositories.find( repository => repository.id === id);

  //verifica se o repositorio foi encontrado.
  if (repository == undefined){
    return response.status(400).json(repository);
  }
  //busca o índice do id solicitado
  indexOf = repositories.indexOf(repository => repository.id === id);
  //remove o índice
  repositories.splice(indexOf);
  return response.status(204).json(repositories);
});

app.post("/repositories/:id/like", (request, response) => {
    //busca o parâmetro ID a partir da requisição
    const {id} = request.params;
    //com o id, busca um repositório específico
    const repository = repositories.find( repository => repository.id === id);
    //caso o repositório não exista retornamos um erro
    if(repository == undefined){
      return response.status(400).json(repository);
    }
    //adiciona um like
    repository.likes += 1;
    return response.json(repository);
});

module.exports = app;
