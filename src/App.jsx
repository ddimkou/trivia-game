import { useState } from "react";
import "./App.css";
import LandingPage from "./LandingPage";
import Trivia from "./Trivia";

const App = () => {
  const [difficulty, setDifficulty] = useState("");
  const [score, setScore] = useState(0);
  return (
    <>
      {difficulty.length <= 0 ? (
        <>
          <LandingPage setDifficulty={setDifficulty} />
        </>
      ) : (
        <>
          <Trivia difficulty={difficulty} score={score} setScore={setScore} />
        </>
      )}
    </>
  );
};

export default App;
