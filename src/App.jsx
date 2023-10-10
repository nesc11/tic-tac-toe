import confetti from 'canvas-confetti'
import { useState } from 'react'
import './App.css'
import { TurnPointer } from './components/TurnPointer'
import { Board } from './components/Board'
import { WinnerModal } from './components/WinnerModal'
import { TURNS } from './constants'
import { checkWinner } from './logic/board'


function App() {
  const [board, setBoard] = useState(Array(9).fill(null))
  const [turn, setTurn] = useState(TURNS.X)
  const [winner, setWinner] = useState(null)

  const updateBoard = index => {
    if (board[index] || winner) return

    const newBoard = [...board]
    newBoard[index] = turn
    setBoard(newBoard)
    setTurn(prevTurn => prevTurn === TURNS.X ? TURNS.O : TURNS.X)

    const newWinner = checkWinner(newBoard)
    if (newWinner) {
      confetti()
      setWinner(newWinner)
    } else if (!newBoard.includes(null)) {
      setWinner(false)
    }
  }

  const resetGame = () => {
    setBoard(Array(9).fill(null))
    setWinner(null)
    setTurn(TURNS.X)
  }

  return (
    <main className='board'>
      <h1>Tic Tac Toe</h1>
      <button onClick={resetGame}>Restart!</button>
      <Board board={board} updateBoard={updateBoard} />
      <TurnPointer turn={turn} />
      {
        winner !== null && <WinnerModal resetGame={resetGame} winner={winner} />
      }
    </main>
  )
}

export default App
