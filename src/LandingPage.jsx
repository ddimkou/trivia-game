const LandingPage = ({ setDifficulty }) => {
  const HandleDifficulty = (e) => {
    setDifficulty(e.target.textContent);
  };
  return (
    <>
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
    </>
  );
};

export default LandingPage;
