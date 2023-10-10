import { useState } from 'react'
import './App.css'


const TURNS = {
  X: 'x',
  O: 'o'
}

const Square = ({ children, updateBoard, index, isSelected }) => {
  const handleClick = () => {
    updateBoard(index)
  }
  return (
    <div onClick={handleClick} className={`square${isSelected ? ' is-selected' : ''}`}>
      {children}
    </div>
  )
}


function App() {
  const [board, setBoard] = useState(Array(9).fill(null))
  const [turn, setTurn] = useState(TURNS.X)

  const updateBoard = index => {
    setBoard(prevBoard => {
      return prevBoard.map((cell, i) => {
        return index === i ? turn : cell
      })
    })
    setTurn(prevTurn => prevTurn === TURNS.X ? TURNS.O : TURNS.X)
  }

  return (
    <main className='board'>
      <h1>Tic Tac Toe</h1>
      <section className='game'>
        {
          board.map((cell, index) => {
            return (
              <Square key={index} index={index} updateBoard={updateBoard}>
                {cell}
              </Square>
            )
          })
        }
      </section>

      <section className='turn'>
        <Square isSelected={turn === TURNS.X}>{TURNS.X}</Square>
        <Square isSelected={turn === TURNS.O}>{TURNS.O}</Square>
      </section>
    </main>
  )
}

export default App
