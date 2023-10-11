import { Square } from "./Square";

export const Board = ({ board, updateBoard }) => {
  return (
    <section className="game">
      {board.map((cell, index) => {
        return (
          <Square key={index} index={index} updateBoard={updateBoard}>
            {cell}
          </Square>
        );
      })}
    </section>
  );
};
