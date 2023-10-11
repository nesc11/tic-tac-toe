import { Square } from "./Square";

export const WinnerModal = ({ winner, resetGame }) => {
  return (
    <section className="winner">
      <div className="text">
        <h2>{winner ? "Ganó:" : "Empate"}</h2>
        {winner && (
          <header className="win">
            <Square>{winner}</Square>
          </header>
        )}
        <footer>
          <button onClick={resetGame}>Play Again!</button>
        </footer>
      </div>
    </section>
  );
};
