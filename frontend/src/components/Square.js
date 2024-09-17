import React from "react";
import "../tictactoe.css";

const Square = ({ value, onClick }) => {
  const squareClass = value ? "square isSelected" : "square";
  return (
    <button className={squareClass} onClick={onClick}>
      {value}
    </button>
  );
};

export default Square;
