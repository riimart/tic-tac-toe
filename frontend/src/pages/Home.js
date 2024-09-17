import { useEffect, useState } from "react";
// components
import TotalCard from "../components/TotalCard";
import Link from "../components/Link";
import MatchDetails from "../components/MatchDetails";

const Home = () => {
  const logoUrl = "/imgs/tic_tac_toe_logo.png";
  const [matches, setMatches] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const matchesPerPage = 2;

  useEffect(() => {
    const fetchMatches = async () => {
      const response = await fetch("/api/matches");
      const json = await response.json();

      if (response.ok) {
        setMatches(json);
      }
    };

    fetchMatches();
  }, []);

  const totalMatches = matches.length;
  const totalPages = Math.ceil(totalMatches / matchesPerPage);

  const roundsPlayed = matches.reduce((total, match) => {
    return total + (match.player_1_wins + match.player_2_wins + match.draws);
  }, 0);

  // Get the matches to display on the current page
  const displayedMatches = matches.slice(
    currentPage * matchesPerPage,
    currentPage * matchesPerPage + matchesPerPage
  );

  const handleNext = () => {
    setCurrentPage((prevPage) => (prevPage + 1) % totalPages);
  };

  const handlePrev = () => {
    setCurrentPage((prevPage) => (prevPage - 1 + totalPages) % totalPages);
  };

  return (
    <div className="home">
      <div className="title">
        <img className="logo" src={logoUrl} alt="Tic-Tac-Toe Logo" />
        <p>
          Developed by:<span>dev.reyyy</span>
        </p>
      </div>

      <div className="cards">
        <TotalCard count={roundsPlayed} title="Rounds Played" />
        <TotalCard count={totalMatches} title="Total Matches" />
      </div>

      <div className="btn-holder">
        <Link to="/new-game" className="btn btn-primary">
          New Game
        </Link>
      </div>

      {/* Carousel Navigation */}
      <div className="match-history-carousel">
        <button
          className="carousel-btn prev-btn"
          onClick={handlePrev}
          disabled={totalMatches <= matchesPerPage}
        >
          Prev
        </button>

        <div className="match-history">
          {displayedMatches.map((match) => (
            <MatchDetails key={match._id} match={match} />
          ))}
        </div>

        <button
          className="carousel-btn next-btn"
          onClick={handleNext}
          disabled={totalMatches <= matchesPerPage}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Home;
