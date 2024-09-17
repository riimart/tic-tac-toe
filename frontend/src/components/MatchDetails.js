import { MdArrowForward } from "react-icons/md";
import Link from "../components/Link";

const MatchDetails = ({ match }) => {
  return (
    <div className="match-details">
      <div className="header">
        <h4>
          {match.player_1} <span>vs</span> {match.player_2}
        </h4>

        <Link to={`/game/${match._id}`} className="btn-link">
          load game <MdArrowForward />
        </Link>
      </div>

      <div className="body">
        <p>
          {match.player_1} - {match.player_1_wins}wins
        </p>
        <p>
          {match.player_2} - {match.player_2_wins}wins
        </p>
        <p>Draws - {match.draws}</p>
      </div>
    </div>
  );
};

export default MatchDetails;
