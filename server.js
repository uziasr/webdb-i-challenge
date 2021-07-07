const express = require('express');

const db = require('./data/dbConfig.js');

const budgetRouter = require('./budgetRouter/budgetRouter')

const server = express();

server.use(express.json());

server.use('', budgetRouter)

module.exports = server;