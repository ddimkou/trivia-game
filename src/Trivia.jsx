/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import he from "he";
import Menu from "./Menu";
import { fetchQuestions } from "./api";
import EndGame from "./EndGame";
import BeatLoader from "react-spinners/BeatLoader";
import { triggerConfetti } from "./confetti";

// Decoder
const decodeEntities = (text) => he.decode(text);
// 429 error delay
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const Trivia = ({ difficulty, score, setScore }) => {
  const [questions, setQuestions] = useState([]);
  const [count, setCount] = useState(0);
  const [shuffledOptions, setShuffledOptions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hintUsed, setHintUsed] = useState(false);
  const [incorrectAnswers, setIncorrectAnswers] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState([]);

  // Fetch questions / if 429: delay 5sec

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      let retryCount = 0;
      const maxRetries = 3;
      const retryDelay = 5000;

      while (retryCount < maxRetries) {
        try {
          const data = await fetchQuestions(difficulty);
          setQuestions(data);
          break; //happy path
        } catch (error) {
          if (error.response && error.response.status === 429) {
            retryCount++;
            console.log(`Retry attempt ${retryCount}`);
            await delay(retryDelay); // wait for retryDelay ms
          } else {
            console.log("Error fetching questions:", error);
            break;
          }
        }
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

      // Shuffle options
      const shuffle = (options) => options.sort(() => Math.random() - 0.5);

      if (hintUsed) {
        const incorrectIndex = Math.floor(
          Math.random() * decodedIncorrectAnswers.length
        );
        options = [correctAnswer, decodedIncorrectAnswers[incorrectIndex]];
        options = shuffle(options); // shuffle after hint
      } else {
        options = shuffle(options); // shuffle normally
      }

      setShuffledOptions(options);
    }
  }, [count, questions, hintUsed]);

  // Check answer
  const checkAnswer = (e) => {
    const textContent = e.target.textContent;
    // if selected incorrect option clicked, its unclickable
    if (selectedOptions.includes(textContent)) {
      return;
    }

    setSelectedOptions((prevOptions) => [...prevOptions, textContent]);
    if (questions.length > 0 && count < questions.length) {
      const correctAnswer = decodeEntities(questions[count].correct_answer);
      if (textContent === correctAnswer) {
        triggerConfetti();
        setCount((prevCount) => prevCount + 1);
        setScore((prevScore) => prevScore + 10);
        // Reset hint for next question
        setHintUsed(false);
      } else {
        setScore((prevScore) => prevScore - 5);
      }
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
    return (
      <div className="spinner-container">
        <BeatLoader color="#dd3f00" size={25} />
      </div>
    );
  }

  // Game finished
  if (count >= questions.length) {
    return <EndGame difficulty={difficulty} score={score} />;
  }

  // Current question and answer
  const currentQuestion = questions[count];
  const decodedQuestion = decodeEntities(currentQuestion.question);
  const correctAnswer = decodeEntities(currentQuestion.correct_answer);

  // Game on
  return (
    <div className="game">
      <div className="game-content">
        <Menu
          count={count}
          score={score}
          setScore={setScore}
          useHint={useHint}
        />
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
              } ${
                selectedOptions.includes(option) && option !== correctAnswer
                  ? "disabled"
                  : ""
              }`}
              onClick={checkAnswer}
            >
              {option}
            </li>
          ))}
        </ul>
        {/* <p>Correct answer: {correctAnswer}</p> */}
      </div>
    </div>
  );
};
export default Trivia;
