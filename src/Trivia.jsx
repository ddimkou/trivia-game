import { fetchQuestions } from "./api";
import { useEffect, useState } from "react";

const Trivia = () => {
  const [questions, setQuestions] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchQuestions();
        setQuestions(data);
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  return <div>Trivia</div>;
};

export default Trivia;
