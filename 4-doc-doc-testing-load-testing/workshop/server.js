const express = require('express');
const bodyParser = require('body-parser');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const PORT = process.env.PORT || 5000;
const app = express();

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


const options = {
  "swagger": "2.0",
  "info": {
    "description": "Three CRU operations : GET, POST, PUT for Todo object",
    "version": "1.0.0",
    "title": "Todo api",
    "contact": {
      "email": "bastien.aubry@ynov"
    }
  },
  "basePath": "/",
  "tags": [
    {
      "name": "todo",
      "description": "Three CRU operations : GET, POST, PUT for Todo object",
      "externalDocs": {
        "description": "Find out more",
        "url": "http://localhost:5000"
      }
    }
  ],
  "paths": {
    "/todo": {
      "post": {
        "tags": [
          "todo"
        ],
        "summary": "Add a new Todo to the store",
        "description": "",
        "operationId": "addtodo",
        "consumes": [
          "application/json"
        ],
        "produces": [
          "application/json"
        ],
        "parameters": [
          {
            "in": "body",
            "name": "body",
            "description": "todo object to save",
            "required": true,
            "schema": {
              "$ref": "#/definitions/todo"
            }
          }
        ],
        "responses": {
          "201": {
            "description": "Sucess"
          },
          "400": {
            "description": "Bad request"
          }
        }
      },
      "get": {
        "tags": [
          "todo"
        ],
        "summary": "getthe lsit of todos",
        "description": "",
        "operationId": "getTodos",
        "produces": [
          "application/json"
        ],
        "responses": {
          "200": {
            "description": "Success"
          },
          "400": {
            "description": "Bad request"
          }
        }
      }
    },
    "/todo/{_id}": {
      "patch": {
        "tags": [
          "todo"
        ],
        "summary": "Update a todo to make it done",
        "description": "",
        "operationId": "updateTodo",
        "consumes": [
          "application/json"
        ],
        "produces": [
          "application/json"
        ],
        "parameters": [
          {
            "name": "_id",
            "in": "path",
            "description": "ID of todo to update",
            "required": true,
            "type": "string",
            "format": "int64"
          }
        ],
        "responses": {
          "200": {
            "description": "Success"
          },
          "400": {
            "description": "Bad request"
          }
        }
      }
    }
  },
  "definitions": {
    "todo": {
      "type": "object",
      "required": [
        "text",
        "done"
      ],
      "properties": {
        "text": {
          "type": "string"
        },
        "done": {
          "type": "boolean"
        }
      },
      "xml": {
        "name": "todo"
      }
    }
  }
}

app.use('/api-doc', swaggerUi.serve, swaggerUi.setup(options));



app.use(express.static(__dirname + '/public'));


app.get('/todo', (req, res) => {
  ToDo.find()
    .then((toDos) => res.status(200).send(toDos))
    .catch((err) => res.status(400).send(err));
});

app.post('/todo', (req, res) => {
  const body = req.body;
  const toDo = new ToDo({
    text: body.text,
  });
  toDo.save(toDo)
    .then((savedToDo) => res.status(201).send(savedToDo))
    .catch((err) => res.status(400).send(err));
});

app.patch('/todo/:id', (req, res) => {
  const { id } = req.params;
  ToDo.findOneAndUpdate({ _id: id }, { done: true })
    .then((toDo) => res.status(200).send(toDo))
    .catch((err) => res.status(400).send(err));
});

const mongoose = require('mongoose');
const ToDo = require('./toDoModel.js').ToDo;
const DB_URI = 'mongodb://mongo:27017/toDoApp';

mongoose.connect(DB_URI).then(() => {
  console.log('Listening on port: ' + PORT);
    
  app.listen(PORT);
});



// OpenAPI routes
