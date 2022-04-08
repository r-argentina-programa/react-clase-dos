import React from "react";
import PropTypes from "prop-types";
import cx from "classnames";
import "./TicTacToe.css";
import FancyButton from "../small/FancyButton";

const Square = ({ value, onClick = () => {} }) => {
  return (
    <div onClick={onClick} className="square">
      {value}
    </div>
  );
};
Square.propTypes = {
  value: PropTypes.oneOf(["X", "O", ""]),
  onClick: PropTypes.func,
};

const WinnerCard = ({ show, winner, onRestart = () => {} }) => {
  return (
    <div className={cx("winner-card", { "winner-card--hidden": !show })}>
      <span className="winner-card-text">
        {winner ? `Player ${winner} has won the game!` : "It's a tie!"}
      </span>
      <FancyButton onClick={onRestart}>Play again?</FancyButton>
    </div>
  );
};

WinnerCard.propTypes = {
  show: PropTypes.bool.isRequired,
  winner: PropTypes.oneOf(["X", "O"]),
  onRestart: PropTypes.func,
};

const getWinner = (tiles, player) => {
  const verticalLine = (starter, player) => {
    return (
      tiles[starter] === player &&
      tiles[starter + 3] === player &&
      tiles[starter + 6] === player
    );
  };
  const horizontalLine = (starter) => {
    return (
      tiles[starter] === player &&
      tiles[starter + 1] === player &&
      tiles[starter + 2] === player
    );
  };
  const obliqueLineA = () => {
    return tiles[0] === player && tiles[4] === player && tiles[8] === player;
  };
  const obliqueLineB = () => {
    return tiles[2] === player && tiles[4] === player && tiles[6] === player;
  };

  const wasVertical = verticalLine(0) || verticalLine(1) || verticalLine(2);
  const wasHorizontal =
    horizontalLine(0) || horizontalLine(3) || horizontalLine(6);
  const wasObliqueA = obliqueLineA();
  const wasObliqueB = obliqueLineB();

  if (wasVertical || wasHorizontal || wasObliqueA || wasObliqueB) {
    return player;
  }
  return null;
};

const useTicTacToeGameState = (initialPlayer) => {
  const [tiles, setTiles] = React.useState([
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
  ]);
  const [currentPlayer, setCurrentPlayer] = React.useState(initialPlayer);
  const [winner, setWinner] = React.useState(null);
  const [gameEnded, setGameEnded] = React.useState(false);

  const setTileTo = (tileIndex, player) => {
    tiles.splice(tileIndex, 1, player);
    setTiles([...tiles]);
    const winner = getWinner(tiles, player);
    setWinner(winner);
    setGameEnded(!!winner);
    setCurrentPlayer(currentPlayer === "X" ? "O" : "X");
  };

  const restart = () => {
    setTiles(["", "", "", "", "", "", "", "", ""]);
    setCurrentPlayer(initialPlayer);
    setGameEnded(false);
  };
  const state = { tiles, currentPlayer, winner, gameEnded, setTileTo, restart };
  return state;
};

const TicTacToe = () => {
  const { tiles, currentPlayer, winner, gameEnded, setTileTo, restart } =
    useTicTacToeGameState("X");
  return (
    <React.Fragment>
      <div className="tictactoe">
        <div className="tictactoe-row">
          <Square
            value={tiles[0]}
            onClick={() => setTileTo(0, currentPlayer)}
          />
          <Square
            value={tiles[1]}
            onClick={() => setTileTo(1, currentPlayer)}
          />
          <Square
            value={tiles[2]}
            onClick={() => setTileTo(2, currentPlayer)}
          />
        </div>
        <div className="tictactoe-row">
          <Square
            value={tiles[3]}
            onClick={() => setTileTo(3, currentPlayer)}
          />
          <Square
            value={tiles[4]}
            onClick={() => setTileTo(4, currentPlayer)}
          />
          <Square
            value={tiles[5]}
            onClick={() => setTileTo(5, currentPlayer)}
          />
        </div>
        <div className="tictactoe-row">
          <Square
            value={tiles[6]}
            onClick={() => setTileTo(6, currentPlayer)}
          />
          <Square
            value={tiles[7]}
            onClick={() => setTileTo(7, currentPlayer)}
          />
          <Square
            value={tiles[8]}
            onClick={() => setTileTo(8, currentPlayer)}
          />
        </div>
      </div>
      <WinnerCard
        show={gameEnded}
        winner={winner}
        onRestart={() => restart()}
      />
    </React.Fragment>
  );
};
export default TicTacToe;
