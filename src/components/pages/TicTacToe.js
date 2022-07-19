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
  const winner = getWinner(tiles);
  const [gameEnded, setGameEnded] = React.useState(false);

  const setTileTo = (tileIndex, player) => {
    tiles.splice(tileIndex, 1, player);
    setTiles([...tiles]);
    const winner = getWinner(tiles, player);
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

  const tilesForRow = [];
  tilesForRow[0] = tiles.slice(0, 3);
  tilesForRow[1] = tiles.slice(3, 6);
  tilesForRow[2] = tiles.slice(6);

  return (
    <div className="tictactoe">
      <WinnerCard show={gameEnded} winner={winner} onRestart={restart} />
      {tilesForRow.map((row, indexA) => (
        <div key={"row" + indexA} className="tictactoe-row">
          {row.map((tile, indexB) => (
            <Square
              key={indexA * 3 + indexB}
              value={tile}
              onClick={() => {
                setTileTo(indexA * 3 + indexB, currentPlayer);
              }}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default TicTacToe;
