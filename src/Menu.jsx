/* eslint-disable react/prop-types */

const Menu = ({ count, score, useHint }) => {
  return (
    <div className="menu">
      <p>{count + 1}/10</p>
      <button className="button-secondary" onClick={useHint}>
        Hint
      </button>
      <p>Score: {score}</p>
    </div>
  );
};

export default Menu;
