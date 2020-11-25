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
      rollDie: (G, ctx) => {
        const randNumber = ctx.random.D6();
        const playerPosition = G.playerPosition[ctx.currentPlayer];
        const index = G.cells[playerPosition].indexOf(ctx.currentPlayer);

        if(index > -1){
          G.cells[playerPosition].splice(index, 1);
        }

        if(G.cells[playerPosition]){
          const newPosition =  G.playerPosition[ctx.currentPlayer] + randNumber
          let tempArray = G.cells[newPosition];
          tempArray.push(ctx.currentPlayer);
          G.playerPosition[ctx.currentPlayer] = newPosition;
          G.cells[newPosition] = tempArray;
        }
      },
    },
    
  };

  