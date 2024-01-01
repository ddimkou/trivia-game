/* eslint-disable react/prop-types */

const Menu = ({ count }) => {
  return (
    <div className="menu">
      <p>{count + 1}/10</p>
      <button className="button-secondary">Hint</button>
    </div>
  );
};

export default Menu;
