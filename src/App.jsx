import confetti from "canvas-confetti";
import { useState } from "react";
import "./App.css";
import { TurnPointer } from "./components/TurnPointer";
import { Board } from "./components/Board";
import { WinnerModal } from "./components/WinnerModal";
import { TURNS } from "./constants";
import { checkWinner } from "./logic/board";

function App() {
  const [board, setBoard] = useState(() => {
    const boardFromLocalStorage = window.localStorage.getItem("board");
    if (boardFromLocalStorage) {
      return JSON.parse(boardFromLocalStorage);
    }
    return Array(9).fill(null);
  });
  const [turn, setTurn] = useState(() => {
    const turnFromStorage = window.localStorage.getItem("turn");
    return turnFromStorage ? turnFromStorage : TURNS.X;
  });
  const [winner, setWinner] = useState(() => {
    const winnerFromStorage = window.localStorage.getItem("winner");
    return winnerFromStorage ? winnerFromStorage : null;
  });

  const updateBoard = (index) => {
    if (board[index] || winner) return;

    const newBoard = [...board];
    newBoard[index] = turn;
    setBoard(newBoard);

    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X;
    setTurn(newTurn);

    window.localStorage.setItem("board", JSON.stringify(newBoard));
    window.localStorage.setItem("turn", newTurn);

    const newWinner = checkWinner(newBoard);
    if (newWinner) {
      window.localStorage.setItem("winner", newWinner);
      confetti();
      setWinner(newWinner);
    } else if (!newBoard.includes(null)) {
      setWinner(false);
    }
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setWinner(null);
    setTurn(TURNS.X);

    window.localStorage.removeItem("board");
    window.localStorage.removeItem("turn");
    if (winner) {
      window.localStorage.removeItem("winner");
    }
  };

  return (
    <main className="board">
      <h1>Tic Tac Toe</h1>
      <button onClick={resetGame}>Restart!</button>
      <Board board={board} updateBoard={updateBoard} />
      <TurnPointer turn={turn} />
      {winner !== null && <WinnerModal resetGame={resetGame} winner={winner} />}
    </main>
  );
}

export default App;
