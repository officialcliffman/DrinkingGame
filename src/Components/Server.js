// src/server.js
const { Server, FlatFile } = require('boardgame.io/server');
const { TicTacToe } = require('./Game');

const server = Server({ games: [TicTacToe],
    db: new FlatFile({
        dir: '/storage/directory',
        logging: (true),
      }), });

server.run(8000);