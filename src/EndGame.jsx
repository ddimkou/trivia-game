/* eslint-disable react/prop-types */
import { useEffect } from "react";
import { startConfetti } from "./confetti";

const EndGame = ({ difficulty, score }) => {
  const tryAgain = () => {
    window.location.reload(false);
  };

  //   confetti effect
  useEffect(() => {
    startConfetti();
  }, []);

  return (
    <div className="endGame">
      <h3>
        Success!! You finished the game on {difficulty} mode with {score}{" "}
        points.
      </h3>
      <button className="button" onClick={tryAgain}>
        Try again
      </button>
    </div>
  );
};

export default EndGame;
