/* eslint-disable react/prop-types */
import { useState } from "react";

const LandingPage = ({ setDifficulty }) => {
  const [showRules, setShowRules] = useState(false);

  const HandleDifficulty = (e) => {
    setDifficulty(e.target.textContent);
  };

  const toggleRules = () => {
    setShowRules(!showRules);
  };

  return (
    <div className="landing-page">
      <h2>Select Your Difficulty</h2>
      <ul>
        <li className="button" onClick={HandleDifficulty}>
          easy
        </li>
        <li className="button" onClick={HandleDifficulty}>
          medium
        </li>
        <li className="button" onClick={HandleDifficulty}>
          hard
        </li>
      </ul>
      <button className="toggle-button" onClick={toggleRules}>
        {showRules ? "Hide Rules" : "Show Rules"}
      </button>
      {showRules && (
        <div className="game-rules">
          <p>Welcome to the trivia game!</p>
          <ul>
            <li>Select a difficulty to start the game.</li>
            <li>Answer each question to the best of your ability.</li>
            <li>
              Use hints if you are stuck, but be careful - they cost points!
            </li>
            <li>Your score will be calculated based on correct answers.</li>
            <li>Try to achieve the highest score possible!</li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default LandingPage;
