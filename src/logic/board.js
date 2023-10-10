import { WINNER_COMBOS } from "../constants"

export const checkWinner = (board) => {
    for (let combo of WINNER_COMBOS) {
      if ((board[combo[0]] === board[combo[1]]) && (board[combo[0]] === board[combo[2]])) {
        return board[combo[0]]
      }
    }
    return null
}