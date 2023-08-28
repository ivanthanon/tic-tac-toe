export const checkWinner = (boardToCheck) => {
    for (const combination of WINNER_COMBINATION) {
      const [x, y, z] = combination;
      if (
        boardToCheck[x] &&
        boardToCheck[x] === boardToCheck[y] &&
        boardToCheck[x] === boardToCheck[z]
      ) {
        return boardToCheck[x];
      }
    }
    return null;
  };