import { INVALID_MOVE } from "boardgame.io/core";

const boardSize = 57;

export const DrinkingGame = {
  // Settings to setup before the game starts
  setup: () => ({
    cells: Array(boardSize).fill([]),
    playerPosition: Array(6).fill(0),
    playerInfos: {},
    newSquare: 0,
    nextSquare: 0,
    closeAllModal: false
  }),

  // Name of the game, links up with the server
  name: "DrinkingGame",

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
                  money: 5,
                  rolls: 0,
                  double: false,
                  checkpoint: 0,
                  poison: false
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
        onBegin: (G, ctx) => {
          let playerInfos = G.playerInfos[ctx.currentPlayer];
          if (playerInfos.double === true) {
            playerInfos.rolls = 2;
            playerInfos.double = false;
          } else {
            playerInfos.rolls = 1;
          }
          G.playerInfos[ctx.currentPlayer] = playerInfos;
          G.closeAllModal = false;
        },
        // Ends the turn if this returns true.
        endIf: (G, ctx) => G.playerInfos[ctx.currentPlayer].rolls === 0,

        onEnd: (G, ctx) => {
          G.closeAllModal = false;
        },

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
            if (newPosition > 22 && G.playerInfos[ctx.currentPlayer].checkpoint === 0) {
              let tempArray = G.cells[23];
              tempArray.push(ctx.currentPlayer)
              G.playerPosition[ctx.currentPlayer] = 23;
              G.cells[23] = tempArray;
              G.newSquare = 23;
              G.nextSquare = newPosition;
            } else if (newPosition > 38 && G.playerInfos[ctx.currentPlayer].checkpoint === 1) {
              let tempArray = G.cells[39];
              tempArray.push(ctx.currentPlayer)
              G.playerPosition[ctx.currentPlayer] = 39;
              G.cells[39] = tempArray;
              G.newSquare = 39;
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
            G.closeAllModal = true;
          }
        },
        checkpointReached: (G, ctx, cont, square) => {
          // Get the position of the current player
          const playerPosition = G.playerPosition[ctx.currentPlayer];
          let currentPlayerInfo = G.playerInfos[ctx.currentPlayer];
          let checkpoint = "";
          if (square === 23) {
            checkpoint = "one";
          } else {
            checkpoint = "two";
          }
          // Remove the player from this square
          let index = "";
          index = G.cells[playerPosition].indexOf(ctx.currentPlayer);
          if (index > -1) {
            G.cells[playerPosition].splice(index, 1);
          }
          if (checkpoint === "one") {
            // Change the players position based on whether they continue or not
            if (cont) {
              let tempArray = G.cells[G.nextSquare];
              G.playerPosition[ctx.currentPlayer] = G.nextSquare;
              tempArray.push(ctx.currentPlayer)
              G.cells[G.nextSquare] = tempArray;
              G.newSquare = G.nextSquare;
              currentPlayerInfo.money -= 10;
              currentPlayerInfo.checkpoint = 1;
              G.playerInfos[ctx.currentPlayer] = currentPlayerInfo;
            } else {
              let tempArray = G.cells[0];
              tempArray.push(ctx.currentPlayer)
              G.playerPosition[ctx.currentPlayer] = 0;
              G.cells[0] = tempArray;
              G.newSquare = 0;
            }
          } else if (checkpoint === "two") {
            if (cont) {
              let tempArray = G.cells[G.nextSquare];
              G.playerPosition[ctx.currentPlayer] = G.nextSquare;
              tempArray.push(ctx.currentPlayer)
              G.cells[G.nextSquare] = tempArray;
              G.newSquare = G.nextSquare;
              currentPlayerInfo.money -= 20;
              currentPlayerInfo.checkpoint = 2;
              G.playerInfos[ctx.currentPlayer] = currentPlayerInfo;
            } else {
              let tempArray = G.cells[23];
              tempArray.push(ctx.currentPlayer)
              G.playerPosition[ctx.currentPlayer] = 23;
              G.cells[23] = tempArray;
              G.newSquare = 23;
            }
          }
        },

        // If the player lands on a square which moves them
        move: (G, ctx, amount) => {
          // Get the position of the current player
          const playerPosition = G.playerPosition[ctx.currentPlayer];

          // Remove the player from this square
          let index = "";
          index = G.cells[playerPosition].indexOf(ctx.currentPlayer);
          if (index > -1) {
            G.cells[playerPosition].splice(index, 1);
          }

          // Move the player to the new square
          let newPosition = G.playerPosition[ctx.currentPlayer] + amount;
          let tempArray = G.cells[newPosition];

          // Makes sure tempArray is an array
          if (tempArray === undefined) {
            tempArray = [];
          }
          tempArray.push(ctx.currentPlayer)

          G.playerPosition[ctx.currentPlayer] = newPosition;
          G.cells[newPosition] = tempArray;
          G.newSquare = newPosition
          // G.closeAllModal = true;
          let currentPlayerInfo = G.playerInfos[ctx.currentPlayer];

          // Remove one roll from their counter
          G.playerInfos[ctx.currentPlayer] = currentPlayerInfo;

        },

        // If the players lands on a square which alters their money
        money: (G, ctx, amount) => {
          G.closeAllModal = false;
          let currentPlayerInfo = G.playerInfos[ctx.currentPlayer];

          // Adds the money to players money
          currentPlayerInfo.money += amount;

          // Remove one roll from their counter
          currentPlayerInfo.rolls -= 1;
          G.playerInfos[ctx.currentPlayer] = currentPlayerInfo;
        },

        // If the player lands on a square which doesn't require functionality
        doNothing: (G, ctx) => {
          G.closeAllModal = false;
          let currentPlayerInfo = G.playerInfos[ctx.currentPlayer];

          // Remove one roll from their counter
          currentPlayerInfo.rolls -= 1;
          G.playerInfos[ctx.currentPlayer] = currentPlayerInfo;
        },

        // If the player lands on a square which gives you a double roll
        double: (G, ctx) => {
          let currentPlayerInfo = G.playerInfos[ctx.currentPlayer];

          // Adds one roll to their next turn
          currentPlayerInfo.rolls -= 1;
          currentPlayerInfo.double = true;
          G.playerInfos[ctx.currentPlayer] = currentPlayerInfo;
        },

        // If the player lands on the poison square
        poison: (G, ctx, amount) => {
          let currentPlayerInfo = G.playerInfos[ctx.currentPlayer];
          
          // Remove the amount of money if poisoned
          if (currentPlayerInfo.poison === true) {
            currentPlayerInfo.money -= amount;
          } else {
            currentPlayerInfo.poison = true;
          }

          currentPlayerInfo.rolls -= 1;
          G.closeAllModal = false;
          G.playerInfos[ctx.currentPlayer] = currentPlayerInfo;
        },
        // Cure the player of the poison
        endPoison: (G, ctx) => {
          let currentPlayerInfo = G.playerInfos[ctx.currentPlayer];
          currentPlayerInfo.poison = false;
          G.closeAllModal = false;
          G.playerInfos[ctx.currentPlayer] = currentPlayerInfo; 
        }


      }
    }
  },

  // Start the game
  startGame: (G, ctx) => {
    G.startGame = true;
  },


};

