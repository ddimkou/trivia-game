/* eslint-disable react/prop-types */
import "./Menu.css";

const Menu = ({ count, score, useHint }) => {
  return (
    <div className="menu">
      <button className="button-secondary" onClick={useHint}>
        Hint
      </button>
      <p>Score: {score}</p>
      <p>{count + 1}/10</p>
    </div>
  );
};

export default Menu;
