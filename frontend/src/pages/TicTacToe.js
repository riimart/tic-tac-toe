import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { MdArrowBack } from "react-icons/md";

import Link from "../components/Link";
import Board from "../components/Board";
import "../tictactoe.css";

const TicTacToe = () => {
  const { matchId } = useParams();
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [winner, setWinner] = useState(null);
  const [matchDetails, setMatchDetails] = useState(null);
  const [rounds, setRounds] = useState(0);

  useEffect(() => {
    const fetchMatch = async () => {
      try {
        const response = await fetch(
          `https://tic-tac-toe-backend.onrender.com/api/matches/${matchId}`
        );
        const json = await response.json();

        if (response.ok) {
          setMatchDetails(json);
          setRounds(json.player_1_wins + json.player_2_wins + json.draws + 1);
        } else {
          console.error("Failed to fetch match details", json);
        }
      } catch (error) {
        console.error("Error fetching match details", error);
      }
    };

    fetchMatch();
  }, [matchId]);

  const calculateWinner = (squares) => {
    const winningCombinations = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let combination of winningCombinations) {
      const [a, b, c] = combination;
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        return squares[a];
      }
    }
    return null;
  };

  const handleClick = async (index) => {
    if (squares[index] || winner) return;

    const newSquares = squares.slice();
    newSquares[index] = isXNext ? "X" : "O";
    setSquares(newSquares);
    setIsXNext(!isXNext);

    const gameWinner = calculateWinner(newSquares);
    if (gameWinner) {
      setWinner(gameWinner);
      await updateScores(gameWinner); // Immediately update scores when a winner is found
    } else if (newSquares.every(Boolean)) {
      setWinner(null);
      await updateScores(null); // Handle the draw case
    }
  };

  // Update scores based on the winner or draw
  const updateScores = async (gameWinner) => {
    const updatedMatchDetails = { ...matchDetails };

    if (gameWinner === "X") {
      updatedMatchDetails.player_1_wins += 1;
    } else if (gameWinner === "O") {
      updatedMatchDetails.player_2_wins += 1;
    } else {
      updatedMatchDetails.draws += 1;
    }

    try {
      const response = await fetch(
        `https://tic-tac-toe-backend.onrender.com/api/matches/${matchId}`,
        {
          method: "PATCH",
          body: JSON.stringify(updatedMatchDetails),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        const json = await response.json();
        setMatchDetails(json);
      } else {
        console.error("Failed to update match details", await response.json());
      }
    } catch (error) {
      console.error("Error updating match details", error);
    }
  };

  const handleRestart = () => {
    setRounds(
      matchDetails.player_1_wins +
        matchDetails.player_2_wins +
        matchDetails.draws +
        1
    );
    setSquares(Array(9).fill(null));
    setIsXNext(true);
    setWinner(null);
  };

  const renderStatusMessage = () => {
    if (winner) {
      return `Winner: ${
        winner === "X" ? matchDetails.player_1 : matchDetails.player_2
      }`;
    } else if (squares.every(Boolean)) {
      return "Draw!";
    } else {
      return `${
        isXNext
          ? ` X - ${matchDetails.player_1}`
          : `O - ${matchDetails.player_2}`
      }'s Turn`;
    }
  };

  if (!matchDetails) {
    return <div className="loader">Loading...</div>;
  }

  return (
    <div className="game">
      <div className="title">
        <h1>Round {rounds}</h1>
        <div className="scores">
          <p>
            {matchDetails.player_1} - {matchDetails.player_1_wins}
          </p>
          <p>
            {matchDetails.player_2} - {matchDetails.player_2_wins}
          </p>
          <p>Draws - {matchDetails.draws}</p>
        </div>
      </div>

      <div className="status">{renderStatusMessage()}</div>

      <div className="game-board">
        <Board squares={squares} onClick={handleClick} />
      </div>

      <div className="btn-holder">
        <Link to="/" className="btn-link">
          <MdArrowBack /> Back to Home
        </Link>

        <button
          className="btn btn-primary"
          onClick={handleRestart}
          disabled={!winner && !squares.every(Boolean)}
        >
          New Round
        </button>
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

export default TicTacToe;
