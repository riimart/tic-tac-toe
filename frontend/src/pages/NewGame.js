import React, { useState } from "react";
import { MdArrowBack } from "react-icons/md";

// components
import Link from "../components/Link";
import MatchForm from "../components/MatchForm";

const NewGame = () => {
  const [formData, setFormData] = useState({
    player_1: "",
    player_2: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="new-game">
      <div className="title">
        <h1>New Game</h1>
        <p>Enter players name then enjoy !</p>
      </div>

      <div className="input-fields">
        <MatchForm />
      </div>

      <div className="btn-holder">
        <Link to="/" className="btn-link">
          <MdArrowBack /> Back to Home
        </Link>
      </div>

      <footer>
        <p>Tic-Tac-Toe Game</p>
        <p className="dev">
          Developed by: <span>dev.reyyy</span>
        </p>
      </footer>
    </div>
  );
};

export default NewGame;
