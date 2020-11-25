import { INVALID_MOVE } from 'boardgame.io/core';


const IsVictory = (cells) => {
    const positions = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6],
      [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]
    ];
  
    const isRowComplete = row => {
      const symbols = row.map(i => cells[i]);
      return symbols.every(i => i !== null && i === symbols[0]);
    };
  
    return positions.map(isRowComplete).some(i => i === true);
  }
  
  // Return true if all `cells` are occupied.
  function IsDraw(cells) {
    return cells.filter(c => c === null).length === 0;
  }

export const TicTacToe = {
    setup: () => ({ cells: Array(21).fill([]),
                    playerPosition: Array(6).fill(0) }),
    
    // clickCell: (G, ctx, id) => {
    //     if (G.cells[id] !== null) {
    //       return INVALID_MOVE;
    //     }
    //     G.cells[id] = ctx.currentPlayer;
    //   },
    //   endIf: (G, ctx) => {
    //     if (IsVictory(G.cells)) {
    //       return { winner: ctx.currentPlayer };
    //     }
    //     if (IsDraw(G.cells)) {
    //       return { draw: true };
    //     }
    //   },

    turn: {
      moveLimit: 1,
    },
    numPlayers: 3,
    moves: {
      rollDie: (G, ctx, num) => {
        const playerPosition = G.playerPosition[ctx.currentPlayer];
        let index = "";

        if(ctx.currentPlayer === "0"){
          index = G.cells[playerPosition].indexOf("blue");
        } else if(ctx.currentPlayer === "1"){
          index = G.cells[playerPosition].indexOf("red");
        }

        if(index > -1){
          G.cells[playerPosition].splice(index, 1);
        }

        if(G.cells[playerPosition]){
          const newPosition =  G.playerPosition[ctx.currentPlayer] + num
          let tempArray = G.cells[newPosition];
          console.log(ctx.currentPlayer)
          if(ctx.currentPlayer === "0"){
            console.log("blue")
            tempArray.push("blue")
          } else if(ctx.currentPlayer === "1"){
            console.log("red")
            tempArray.push("red")
          }
          G.playerPosition[ctx.currentPlayer] = newPosition;
          G.cells[newPosition] = tempArray;
        }
      },
    },
    
  };

  