import axios from "axios";

const fetchQuestions = async () => {
  try {
    const response = await axios.get(
      "https://opentdb.com/api.php?amount=10&type=multiple"
    );
    return response.data.results;
  } catch (error) {
    console.log("error fetching questions", error);
    throw error;
  }
};
export { fetchQuestions };
