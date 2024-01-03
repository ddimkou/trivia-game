/* eslint-disable react/prop-types */
import { fetchQuestions } from "./api";
import { useState, useEffect } from "react";
import he from "he";
import Menu from "./Menu";

// decoder
const decodeEntities = (text) => he.decode(text);

// rafce
const Trivia = ({ difficulty, score, setScore }) => {
  const [questions, setQuestions] = useState([]);
  const [count, setCount] = useState(0);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchQuestions(difficulty);
        setQuestions(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [difficulty]);

  // score multiplier

  const getScoreMultiplier = (difficulty) => {
    switch (difficulty) {
      case "easy":
        return 10;
      case "medium":
        return 15;
      case "hard":
        return 25;
      default:
        return 0;
    }
  };
  const scoreMultiplier = getScoreMultiplier(difficulty);

  // waiting for fetched data
  if (questions.length === 0) {
    return <p>Loading...</p>;
  }

  // finished
  if (count >= questions.length) {
    return <div>yay</div>;
  }

  //fetch success. game on

  const decodedQuestion = decodeEntities(questions[count].question);
  const correctAnswer = decodeEntities(questions[count].correct_answer);
  const incorrectAnswers =
    questions[count].incorrect_answers.map(decodeEntities);
  const options = [...incorrectAnswers, correctAnswer];

  // shuffle with sort
  // https://www.freecodecamp.org/news/how-to-shuffle-an-array-of-items-using-javascript-or-typescript/
  const shuffle = (options) => {
    return options.sort(() => Math.random() - 0.5);
  };
  const shuffledOptions = shuffle(options);

  // check answer
  const checkAnswer = (e) => {
    const textContent = e.target.textContent;

    if (textContent === correctAnswer) {
      setCount((prevCount) => prevCount + 1);
      setScore((prevScore) => prevScore + scoreMultiplier);
    } else {
      console.log("try again");
      setScore((prevScore) => prevScore - 5);
    }
  };

  return (
    <div className="game">
      <Menu count={count} score={score} setScore={setScore} />
      <>
        <h2 dangerouslySetInnerHTML={{ __html: decodedQuestion }}></h2>
        <ul>
          {shuffledOptions.map((shuffleOption, key) => (
            <li key={key} className="button" onClick={checkAnswer}>
              {shuffleOption}
            </li>
          ))}
        </ul>
        <p>Correct answer: {correctAnswer}</p>
      </>
    </div>
  );
};

export default Trivia;
