import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const MatchForm = () => {
  const [player_1, setPlayer1] = useState("");
  const [player_2, setPlayer2] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const match = { player_1, player_2 };
    const response = await fetch(
      "https://tic-tac-toe-gq68.onrender.com/api/matches",
      {
        method: "Post",
        body: JSON.stringify(match),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
    }
    if (response.ok) {
      setPlayer1("");
      setPlayer2("");
      setError(null);

      navigate(`/game/${json._id}`);
    }
  };

  return (
    <form className="match-form" onSubmit={handleSubmit}>
      {error && <div className="error">{error}</div>}

      <div className="input-field">
        <label htmlFor="player_1">Player 1</label>
        <input
          className="input-box outline"
          type="text"
          onChange={(e) => setPlayer1(e.target.value)}
          value={player_1}
        />
      </div>

      <div className="input-field">
        <label htmlFor="player_2">Player 2</label>
        <input
          className="input-box outline"
          type="text"
          onChange={(e) => setPlayer2(e.target.value)}
          value={player_2}
        />
      </div>
      <button className="btn btn-primary btn-form">Start Game</button>
    </form>
  );
};

export default MatchForm;
