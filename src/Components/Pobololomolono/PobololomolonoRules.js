import { INVALID_MOVE } from "boardgame.io/core";

const boardSize = 57;

export const Pobololomolono = {
  // Settings to setup before the game starts
  setup: () => ({
    pobo: ['p', 'o', 'b', 'o', 'l', 'o', 'l', 'o', 'm', 'o', 'l', 'o', 'n', 'o' ],
    currentLetter: 0,
    playerInfos: {}
  }),

  // Name of the game, links up with the server
  name: "Pobololomolono",

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
        moveLimit: 1,
      //   onBegin: (G, ctx) => {
      //     let playerInfos = G.playerInfos[ctx.currentPlayer];
      //     if (playerInfos.double === true) {
      //       playerInfos.rolls = 2;
      //       playerInfos.double = false;
      //     } else {
      //       playerInfos.rolls = 1;
      //     }
      //     G.playerInfos[ctx.currentPlayer] = playerInfos;
      //     G.closeAllModal = false;
      //   },
      //   // Ends the turn if this returns true.
      //   endIf: (G, ctx) => G.playerInfos[ctx.currentPlayer].rolls === 0,

      //   onEnd: (G, ctx) => {
      //     G.closeAllModal = false;
      //   },

        // Set the initial player as player 1 and go through the players afterwards
        order: {
          first: (G, ctx) => 0,
          next: (G, ctx) => (ctx.playOrderPos + 1) % G.numPlayers,
        }
      },

      // When the player clicks the dice
      moves: {
        letterPressed: (G, ctx) => {
          let currentLetter = G.currentLetter; 
          if(currentLetter === 13){
            currentLetter = 0;
          }else{
            currentLetter += 1;
          }

          G.currentLetter = currentLetter;
        },
      }
    },
  },

  // Start the game
  startGame: (G, ctx) => {
    G.startGame = true;
  },


};

