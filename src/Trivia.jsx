import { fetchQuestions } from "./api";
import { useState, useEffect } from "react";

const Trivia = () => {
  const [questions, setQuestions] = useState("");
  const [count, setCount] = useState(0);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchQuestions();
        setQuestions(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  // waiting for fetched data
  if (!questions.length) {
    return <p>Loading...</p>;
  }

  //success

  const correctAnswer = questions[count].correct_answer;
  const incorrectAnswers = questions[count].incorrect_answers;
  const options = [...incorrectAnswers, correctAnswer];

  // shuffle with sort
  // https://www.freecodecamp.org/news/how-to-shuffle-an-array-of-items-using-javascript-or-typescript/
  const shuffle = (options) => {
    return options.sort(() => Math.random() - 0.5);
  };
  const shuffledOptions = shuffle(options);

  const checkAnswer = (e) => {
    const textContent = e.target.textContent;

    textContent === correctAnswer
      ? setCount(count + 1)
      : console.log("try again");
  };
  return (
    <div className="game">
      {count < 10 ? (
        <>
          <h1>Question: {count + 1} out of 10</h1>
          <h2>{questions[count].question}</h2>
          <ul>
            {shuffledOptions.map((shuffleOption, key) => (
              <li key={key} className="button" onClick={checkAnswer}>
                {shuffleOption}
              </li>
            ))}
          </ul>
          <p>Correct answer: {correctAnswer}</p>
        </>
      ) : (
        <>
          <p>Game Over.</p>
          <p>todo:</p>
          <p>redirect/play again</p>
          <p>display score</p>
        </>
      )}
    </div>
  );
};

export default Trivia;
