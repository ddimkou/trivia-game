/* eslint-disable react/prop-types */
import "./Menu.css";

const Menu = ({ count, score, useHint }) => {
  return (
    <div className="menu">
      <p>Score: {score}</p>
      <p>{count + 1}/10</p>
      <button className="button-secondary" onClick={useHint}>
        Hint
      </button>
    </div>
  );
};

export default Menu;
