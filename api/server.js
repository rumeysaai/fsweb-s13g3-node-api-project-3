const express = require('express');

const server = express();
server.use(express.json());
const { logger } = require('./middleware/middleware');

server.use(logger);
// ekspres'in varsayılan olarak istek gövdelerinde JSON'u ayrıştıramayacağını unutmayın

// global ara yazılımlar ve kullanıcı routelarının buraya bağlanması gerekir

const usersRouter = require('./users/users-router');
server.use('/api/users', usersRouter);

server.get('/', (req, res) => {
  res.send(`<h2>Biraz ara yazılım yazalım!</h2>`);
});

module.exports = server;
