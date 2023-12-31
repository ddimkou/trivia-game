import { useState } from "react";
import "./App.css";
import LandingPage from "./LandingPage";
import Trivia from "./Trivia";

const App = () => {
  const [difficulty, setDifficulty] = useState("");
  return (
    <>
      {difficulty.length <= 0 ? (
        <>
          <LandingPage setDifficulty={setDifficulty} />
        </>
      ) : (
        <>
          <Trivia difficulty={difficulty} />
        </>
      )}
    </>
  );
};

export default App;
