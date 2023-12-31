import axios from "axios";

const validDifficulties = ["easy", "medium", "hard"];
const fetchQuestions = async (difficulty) => {
  if (!validDifficulties.includes(difficulty)) {
    throw new Error("Invalid difficulty level");
  }
  try {
    const response = await axios.get(
      `https://opentdb.com/api.php?amount=10&difficulty=${difficulty}&type=multiple`
    );
    return response.data.results;
  } catch (error) {
    console.log("error fetching questions", error);
    throw error;
  }
};
export { fetchQuestions };
