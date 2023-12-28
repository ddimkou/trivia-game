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

  return (
    <div>
      {questions.map((question, index) => (
        <div key={index}>
          <p>{question.question}</p>
          {/* Render options and other details here */}
        </div>
      ))}
    </div>
  );
};

export default Trivia;
