import { INVALID_MOVE } from "boardgame.io/core";

const boardSize = 57;

export const TicTacToe = {
  // Settings to setup before the game starts
  setup: () => ({
    cells: Array(boardSize).fill([]),
    playerPosition: Array(6).fill(0),
    playerInfos: {},
    newSquare: 0,
    nextSquare: 0
  }),

  // Name of the game, links up with the server
  name: "TicTacToe",

  // There are two phases, one for setup which is the lobby screen and the second is the main game
  phases: {
    setup: {
      // Start means that the game will automatically start on this phase
      start: true,

      // The next phase we want is the 'main' phase
      next: "main",

      // Sets all the players to be on the setup Phase
      turn: {
        onBegin: (G, ctx) => {
          ctx.events.setActivePlayers({ all: "setup" })
        },

        stages: {
          setup: {
            moves: {

              // When a player joins the lobby
              join: (G, ctx) => {
                // If we have already joined, we ignore this.
                if (G.playerInfos.hasOwnProperty(ctx.playerID)) {
                  return;
                }
                let tempArray = G.cells[0];
                tempArray.push(ctx.playerID);
                G.cells[0] = tempArray;
                // Assigns the player a default color that hasn't already been selected
                const arrayOfColors = Array(6).fill(true);
                let newColor;
                Object.values(G.playerInfos).forEach(
                  (playerInfo) => arrayOfColors[playerInfo.color] = false
                )
                arrayOfColors.some((available, color) => {
                  if (available) {
                    newColor = color;
                    return true;
                  }
                  return false;
                });

                // Sets the player info
                G.playerInfos[ctx.playerID] = {
                  name: `Player ${parseInt(ctx.playerID) + 1}`,
                  color: newColor,
                  ready: false,
                };

              },

              // When the player changes their username
              setName: (
                G,
                ctx,
                name,
              ) => {
                G.playerInfos[ctx.playerID].name = name;
              },

              // When the player clicks the ready up checkbox
              setReady: (G, ctx, checked) => {
                G.playerInfos[ctx.playerID].ready = checked;
              },

              // When the player changes their color
              setColor: (
                G,
                ctx,
                color,
              ) => {

                // If we are not actually changing the color we can ignore this.
                // This happens when we click on the same color we already have.
                if (G.playerInfos[ctx.playerID].color === color) {
                  return;
                }

                // It's an invalid move if someone else already has that color.
                if (
                  Object.values(G.playerInfos).some(
                    (info) => info.color === color
                  )
                ) {
                  return INVALID_MOVE;
                }
                G.playerInfos[ctx.playerID].color = color;
              },

              // When the initial player clicks start game
              startGame: (G, ctx) => {
                if (ctx.playerID !== "0") {
                  return INVALID_MOVE;
                }

                // If some players are not ready, we can't start the game
                if (Object.values(G.playerInfos).some((info) => info.ready === false)) {
                  return INVALID_MOVE;
                }

                // Set the number of players as the amount that have joined and end the setup phase
                G.numPlayers = Object.keys(G.playerInfos).length;
                ctx.events.endPhase();
              }
            }
          }
        }
      }
    },

    // The main game phase
    main: {

      turn: {
        // Set one move per turn for the player
        // moveLimit: 1,

        // Set the initial player as player 1 and go through the players afterwards
        order: {
          first: (G, ctx) => 0,
          next: (G, ctx) => (ctx.playOrderPos + 1) % G.numPlayers,
        }
      },

      // When the player clicks the dice
      moves: {
        rollDie: (G, ctx, num) => {
          // Get the position of the current player
          const playerPosition = G.playerPosition[ctx.currentPlayer];

          // Remove the player from this square
          let index = "";
          index = G.cells[playerPosition].indexOf(ctx.currentPlayer);
          if (index > -1) {
            G.cells[playerPosition].splice(index, 1);
          }

          // Set the new player position
          if (G.cells[playerPosition]) {
            let newPosition = G.playerPosition[ctx.currentPlayer] + num;

            // Sends player back to start if player reaches end of board
            if (newPosition > 22) {
              let tempArray = G.cells[23];
              tempArray.push(ctx.currentPlayer)
              G.playerPosition[ctx.currentPlayer] = 23;
              G.cells[23] = tempArray;
              G.newSquare = 23;
              G.nextSquare = newPosition;
            } else {

              let tempArray = G.cells[newPosition];

              // Makes sure tempArray is an array
              if (tempArray === undefined) {
                tempArray = [];
              }
              tempArray.push(ctx.currentPlayer)

              G.playerPosition[ctx.currentPlayer] = newPosition;
              G.cells[newPosition] = tempArray;
              G.newSquare = newPosition
            }
          }
        },
        checkpointOneReached: (G, ctx, cont) => {
          // Get the position of the current player
          const playerPosition = G.playerPosition[ctx.currentPlayer];

          // Remove the player from this square
          let index = "";
          index = G.cells[playerPosition].indexOf(ctx.currentPlayer);
          if (index > -1) {
            G.cells[playerPosition].splice(index, 1);
          }

          // Change the players position based on whether they continue or not
          if (cont) {
            let tempArray = G.cells[G.nextSquare];
            G.playerPosition[ctx.currentPlayer] = G.nextSquare;
            tempArray.push(ctx.currentPlayer)
            G.cells[G.nextSquare] = tempArray;
            G.newSquare = G.nextSquare;
          }else{
            let tempArray = G.cells[0];
            tempArray.push(ctx.currentPlayer)
            G.playerPosition[ctx.currentPlayer] = 0;
            G.cells[0] = tempArray;
            G.newSquare = 0;
          }
        }

      },
    }
  },

  // Start the game
  startGame: (G, ctx) => {
    G.startGame = true;
  },


};

