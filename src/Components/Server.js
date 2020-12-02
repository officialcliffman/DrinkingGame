// // For deployment
// import { Server } from 'boardgame.io/server';
// import path from 'path';
// import serve from 'koa-static';
// import { TicTacToe } from './Game';

// const server = Server({ games: [TicTacToe] });
// const PORT = process.env.PORT || 8000;

// // Build path relative to the server.js file
// const frontEndAppBuildPath = path.resolve(__dirname, '../../build');
// server.app.use(serve(frontEndAppBuildPath))
// server.run(PORT, () => {
//   server.app.use(
//     async (ctx, next) => await serve(frontEndAppBuildPath)(
//       Object.assign(ctx, { path: 'index.html' }),
//       next
//     )
//   )
// });

// For local
const { Server, FlatFile } = require('boardgame.io/server');
const { DrinkingGame } = require('./Game');

const server = Server({ games: [DrinkingGame],
    db: new FlatFile({
        dir: '/storage/directory',
        logging: (true),
      }), });
      server.run(8000);

