// import { fetchQuestions } from "./api";
import { useState } from "react";
import { questionsFile } from "./questions";

const Trivia = () => {
  const [questions, setQuestions] = useState(questionsFile);
  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const data = await fetchQuestions();
  //       setQuestions(data);
  //       console.log(data);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };
  //   fetchData();
  // }, []);

  const count = 0;

  const correctAnswer = questions[count].correct_answer;
  const incorrectAnswers = questions[count].incorrect_answers;
  const options = [...incorrectAnswers, correctAnswer];

  // shuffle with sort
  // https://www.freecodecamp.org/news/how-to-shuffle-an-array-of-items-using-javascript-or-typescript/
  const shuffle = (options) => {
    return options.sort(() => Math.random() - 0.5);
  };
  const shuffledOptions = shuffle(options);
  return (
    <div className="game">
      <p>{questions[count].question}</p>
      <ul>
        {shuffledOptions.map((shuffleOption, key) => (
          <li key={key}>{shuffleOption}</li>
        ))}
      </ul>
      <p>correct: {correctAnswer}</p>
    </div>
  );
};

export default Trivia;
