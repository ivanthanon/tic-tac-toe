import { useState } from "react";
import "./App.css";
import confetti from "canvas-confetti";

const TURNS = {
  X: "❌",
  O: "⚪",
};

const WINNER_COMBINATION = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

const Square = ({ children, isSelected, updateBoard, index, changeTurn }) => {
  const className = `square ${isSelected ? "is-selected" : ""}`;

  const handleClick = () => {
    updateBoard(index);
    changeTurn(index);
  };

  return (
    <div className={className} onClick={handleClick}>
      {children}
    </div>
  );
};

function App() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [turn, setTurn] = useState(TURNS.X);
  const [winner, setWinner] = useState(null); //null NO winner, draw.

  const updateBoard = (index) => {
    if (board[index] || winner) return; //Occupied or there is a winner, stop.

    //Update board
    const newBoard = [...board];
    newBoard[index] = turn;
    setBoard(newBoard);

    //Update winner
    const newWinner = checkWinner(newBoard);
    if (newWinner) {
      confetti();
      setWinner(() => {
        //it is necessary with callback because update state (hook) is asynchronous
        console.log(`Ganador: ${newWinner}`);
        return newWinner;
      });
    } else if (checkEndGame(newBoard)) {
      setWinner(false);
    }
  };

  //ChangeTurn
  const changeTurn = (index) => {
    if (board[index] || winner) return;
    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X;
    setTurn(newTurn);
  };

  const checkWinner = (boardToCheck) => {
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

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setTurn(TURNS.X);
    setWinner(null);
  };

  const checkEndGame = (newBoard) => {
    return newBoard.every((square) => square !== null);
  };

  return (
    <main className="board">
      <h1>Tic tac toe - Iván Thanon</h1>
      <button onClick={resetGame}>Reset de la partida</button>
      <section className="game">
        {board.map((value, index) => {
          return (
            <Square
              key={index}
              changeTurn={changeTurn}
              index={index}
              updateBoard={updateBoard}
            >
              {value}
            </Square>
          );
        })}
      </section>

      <section className="turn">
        <Square isSelected={turn === TURNS.X}>{TURNS.X}</Square>
        <Square isSelected={turn === TURNS.O}>{TURNS.O}</Square>
      </section>
      <div class="textTurn">TURNO</div>

      {winner !== null && (
        <section className="winner">
          <div className="text">
            <h2>{winner === false ? "Empate" : "Ganador:"}</h2>
            <header className="win">
              {winner && <Square>{winner}</Square>}
            </header>
            <footer>
              <button onClick={resetGame}>Nueva partida</button>
            </footer>
          </div>
        </section>
      )}
    </main>
  );
}

export default App;
