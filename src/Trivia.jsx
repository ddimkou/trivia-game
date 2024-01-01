/* eslint-disable react/prop-types */
import { fetchQuestions } from "./api";
import { useState, useEffect } from "react";
import he from "he";
import Menu from "./Menu";

// decoder
const decodeEntities = (text) => he.decode(text);

const Trivia = ({ difficulty }) => {
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

  const checkAnswer = (e) => {
    const textContent = e.target.textContent;

    textContent === correctAnswer
      ? setCount((prevCount) => prevCount + 1)
      : console.log("try again");
  };
  return (
    <div className="game">
      <Menu count={count} />
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
