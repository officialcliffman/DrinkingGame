import { INVALID_MOVE } from "boardgame.io/core";

export const TicTacToe = {
  setup: () => ({
    cells: Array(21).fill([]),
    playerPosition: Array(6).fill(0),
    playerInfos: {}
  }),
  name: "TicTacToe",
  phases: {
    setup: {
      start: true,
      next: "main",
      turn: {
        onBegin: (G, ctx) => {
          ctx.events.setActivePlayers({ all: "setup" })
        },
        stages: {
          setup: {
            moves: {
              join: (G, ctx) => {
                // If we have already joined, we ignore this.
                if (G.playerInfos.hasOwnProperty(ctx.playerID)) {
                  return;
                }
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

                G.playerInfos[ctx.playerID] = {
                  name: `Player ${parseInt(ctx.playerID) + 1}`,
                  color: newColor,
                  ready: false,
                };

              },
              setName: (
                G,
                ctx,
                name,
              ) => {
                // Nothing happens if the name is empty.
                // This way we make sure a player without a name is not ready.
                if (!name) {
                  return;
                }
                G.playerInfos[ctx.playerID].name = name;
                // In pass-and-play mode, when everyone is ready, we start the game.
                // if (Object.values(G.playerInfos).every(info => info.ready)) {
                // ctx.events.endPhase();
                // }
              },
              setReady: (G, ctx, checked) => {
                G.playerInfos[ctx.playerID].ready = checked;
              },
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
              startGame: (G, ctx) => {
                if (ctx.playerID !== "0") {
                  return INVALID_MOVE;
                }

                // If some players are not ready, we can't start the game. Not ready is
                // the same as writing down your name, at least for now.
                if (Object.values(G.playerInfos).some((info) => info.ready === false)) {
                  return INVALID_MOVE;
                }
                
                G.numPlayers = Object.keys(G.playerInfos).length;
                ctx.events.endPhase();
              }
            }
          }
        }
      }
    },
    main: {
      turn: {
        onBegin: (G, ctx) => {
          G.currentPositions = {};
          // gotoStage(G, ctx, "rolling");
          G.currentPlayerHasStarted = false;
        },
        order: {
          first: (G, ctx) => {console.log("first"); return 0;},
          next: (G, ctx) => {
            console.log("next")
            console.log((ctx.playOrderPos + 1) % G.numPlayers);
            return(ctx.playOrderPos + 1) % G.numPlayers},
          playOrder: (G, ctx) => {
            // Take the actual number of players, and randomize amongst them.
            console.log("playOrder")
            let playOrder = Array(G.numPlayers)
              .fill(null)
              .map((_, i) => i.toString());
            playOrder = ctx.random.Shuffle(playOrder);
            return playOrder;
          },
        },
        moves: {
          rollDie: (G, ctx, num) => {
            const playerPosition = G.playerPosition[ctx.currentPlayer];
            let index = "";
      
            if (ctx.currentPlayer === "0") {
              index = G.cells[playerPosition].indexOf("blue");
            } else if (ctx.currentPlayer === "1") {
              index = G.cells[playerPosition].indexOf("red");
            }
      
            if (index > -1) {
              G.cells[playerPosition].splice(index, 1);
            }
      
            if (G.cells[playerPosition]) {
              const newPosition = G.playerPosition[ctx.currentPlayer] + num
              let tempArray = G.cells[newPosition];
              if (ctx.currentPlayer === "0") {
                tempArray.push("blue")
              } else if (ctx.currentPlayer === "1") {
                tempArray.push("red")
              }
              G.playerPosition[ctx.currentPlayer] = newPosition;
              G.cells[newPosition] = tempArray;
            }
          },
        },
      },
    }
  },
  turn:{
    moveLimit: 1,
  },
   startGame: (G, ctx) => {
    G.startGame = true;
  },
 

};

