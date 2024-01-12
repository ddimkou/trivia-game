/* eslint-disable react/prop-types */
const LandingPage = ({ setDifficulty }) => {
  const HandleDifficulty = (e) => {
    setDifficulty(e.target.textContent);
  };
  return (
    <div className="landing-page">
      <h2>Select Your Difficulty</h2>
      <ul>
        <li className="button" onClick={HandleDifficulty}>
          easy
        </li>
        <li className="button" onClick={HandleDifficulty}>
          medium
        </li>
        <li className="button" onClick={HandleDifficulty}>
          hard
        </li>
      </ul>
    </div>
  );
};

export default LandingPage;
