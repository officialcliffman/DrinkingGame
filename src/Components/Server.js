// src/server.js
const { Server, FlatFile } = require('boardgame.io/server');
const { DrinkingGame } = require('./Game');

const server = Server({ games: [DrinkingGame],
    db: new FlatFile({
        dir: '/storage/directory',
        logging: (true),
      }), });

server.run(8000);