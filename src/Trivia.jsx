/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import he from "he";
import Menu from "./Menu";
import { fetchQuestions } from "./api";

// Decoder
const decodeEntities = (text) => he.decode(text);

const Trivia = ({ difficulty, score, setScore }) => {
  const [questions, setQuestions] = useState([]);
  const [count, setCount] = useState(0);
  const [shuffledOptions, setShuffledOptions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hintUsed, setHintUsed] = useState(false);
  const [incorrectAnswers, setIncorrectAnswers] = useState([]);

  // Fetch questions
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const data = await fetchQuestions(difficulty);
        setQuestions(data);
      } catch (error) {
        console.log(error);
      }
      setIsLoading(false);
    };
    fetchData();
  }, [difficulty]);

  // Shuffle options and apply hint logic
  useEffect(() => {
    if (questions.length > 0 && count < questions.length) {
      const correctAnswer = decodeEntities(questions[count].correct_answer);
      const decodedIncorrectAnswers =
        questions[count].incorrect_answers.map(decodeEntities);
      setIncorrectAnswers(decodedIncorrectAnswers);
      let options = [...decodedIncorrectAnswers, correctAnswer];
      const shuffle = (options) => options.sort(() => Math.random() - 0.5);
      options = shuffle(options);

      if (hintUsed) {
        const incorrectIndex = Math.floor(
          Math.random() * decodedIncorrectAnswers.length
        );
        options = [correctAnswer, decodedIncorrectAnswers[incorrectIndex]];
      }

      setShuffledOptions(options);
    }
  }, [count, questions, hintUsed]);

  // Check answer
  const checkAnswer = (e) => {
    const textContent = e.target.textContent;
    if (questions.length > 0 && count < questions.length) {
      const correctAnswer = decodeEntities(questions[count].correct_answer);
      if (textContent === correctAnswer) {
        setCount((prevCount) => prevCount + 1);
        setScore((prevScore) => prevScore + 10);
      } else {
        setScore((prevScore) => prevScore - 5);
      }
      // Reset hint for next question
      setHintUsed(false);
    }
  };

  // Hint functionality
  const useHint = () => {
    if (!hintUsed && questions.length > 0 && count < questions.length) {
      setHintUsed(true);
      setScore((prevScore) => prevScore - 5);
    }
  };

  // Waiting for fetched data
  if (isLoading) {
    return <p>Loading...</p>;
  }

  // Game finished
  if (count >= questions.length) {
    return <div>Yay</div>;
  }

  // Current question and answer
  const currentQuestion = questions[count];
  const decodedQuestion = decodeEntities(currentQuestion.question);
  const correctAnswer = decodeEntities(currentQuestion.correct_answer);

  // Game on
  return (
    <div className="game">
      <Menu count={count} score={score} setScore={setScore} useHint={useHint} />
      <h2 dangerouslySetInnerHTML={{ __html: decodedQuestion }}></h2>
      <ul>
        {shuffledOptions.map((option, key) => (
          <li
            key={key}
            className={`button ${
              hintUsed &&
              option !== correctAnswer &&
              !incorrectAnswers.includes(option)
                ? "disabled"
                : ""
            }`}
            onClick={checkAnswer}
          >
            {option}
          </li>
        ))}
      </ul>
      <p>Correct answer: {correctAnswer}</p>
    </div>
  );
};

export default Trivia;
