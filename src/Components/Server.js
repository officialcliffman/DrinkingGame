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
import { Server, FlatFile } from 'boardgame.io/server';
import {Pobololomolono} from './Pobololomolono/PobololomolonoRules'
import { DrinkingGame } from './DrinkingGame/DrinkingGameRules';
console.log("hi")
const server = Server({ games: [DrinkingGame, Pobololomolono],
    db: new FlatFile({
        dir: '/storage/directory',
        logging: (true),
      }), });
      server.run(8000);

