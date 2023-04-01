import React, { useEffect, useState } from "react";
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

const getWinner = (tiles) => {
  const case1 =
    tiles[0] !== "" && tiles[0] === tiles[1] && tiles[1] === tiles[2];
  const case2 =
    tiles[3] !== "" && tiles[3] === tiles[4] && tiles[4] === tiles[5];
  const case3 =
    tiles[6] !== "" && tiles[6] === tiles[7] && tiles[7] === tiles[8];
  const case4 =
    tiles[0] !== "" && tiles[0] === tiles[3] && tiles[3] === tiles[6];
  const case5 =
    tiles[1] !== "" && tiles[1] === tiles[4] && tiles[4] === tiles[7];
  const case6 =
    tiles[6] !== "" && tiles[6] === tiles[7] && tiles[7] === tiles[8];
  const case7 =
    tiles[0] !== "" && tiles[0] === tiles[4] && tiles[4] === tiles[8];
  const case8 =
    tiles[2] !== "" && tiles[2] === tiles[4] && tiles[4] === tiles[6];
  let winner = case1
    ? tiles[0]
    : case2
    ? tiles[3]
    : case3
    ? tiles[6]
    : case4
    ? tiles[0]
    : case5
    ? tiles[1]
    : case6
    ? tiles[6]
    : case7
    ? tiles[0]
    : case8
    ? tiles[2]
    : null;
  return winner;
};

const useTicTacToeGameState = (initialPlayer) => {
  const [tiles, setTiles] = useState(["", "", "", "", "", "", "", "", ""]);
  const [currentPlayer, setCurrentPlayer] = useState(initialPlayer);
  const [gameEnded, setGameEnded] = useState(false);
  const winner = getWinner(tiles);

  const setTileTo = (tileIndex, player) => {
    setTiles((oldTiles) =>
      oldTiles.map((oldTile, index) =>
        tileIndex === index ? (oldTile = player) : oldTile
      )
    );
  };

  useEffect(() => {
    const tie = tiles.filter((item) => item !== "").length === 9;
    getWinner(tiles) || tie
      ? setGameEnded(true)
      : setCurrentPlayer((oldCurrentPlayer) =>
          oldCurrentPlayer === "X" ? "O" : "X"
        );
  }, [tiles]);

  const restart = () => {
    setTiles(["", "", "", "", "", "", "", "", ""]);
    setCurrentPlayer("O");
    setGameEnded(false);
  };

  return { tiles, currentPlayer, winner, gameEnded, setTileTo, restart };
};

const TicTacToe = () => {
  const { tiles, currentPlayer, winner, gameEnded, setTileTo, restart } =
    useTicTacToeGameState("O");
  return (
    <div className="tictactoe">
      <WinnerCard show={gameEnded} winner={winner} onRestart={restart} />
      <h1>Next player: {currentPlayer}</h1>
      <div className="tictactoe-row">
        <Square
          value={tiles[0]}
          onClick={() => setTileTo(0, currentPlayer)}
        ></Square>
        <Square
          value={tiles[1]}
          onClick={() => setTileTo(1, currentPlayer)}
        ></Square>
        <Square
          value={tiles[2]}
          onClick={() => setTileTo(2, currentPlayer)}
        ></Square>
      </div>
      <div className="tictactoe-row">
        <Square
          value={tiles[3]}
          onClick={() => setTileTo(3, currentPlayer)}
        ></Square>
        <Square
          value={tiles[4]}
          onClick={() => setTileTo(4, currentPlayer)}
        ></Square>
        <Square
          value={tiles[5]}
          onClick={() => setTileTo(5, currentPlayer)}
        ></Square>
      </div>
      <div className="tictactoe-row">
        <Square
          value={tiles[6]}
          onClick={() => setTileTo(6, currentPlayer)}
        ></Square>
        <Square
          value={tiles[7]}
          onClick={() => setTileTo(7, currentPlayer)}
        ></Square>
        <Square
          value={tiles[8]}
          onClick={() => setTileTo(8, currentPlayer)}
        ></Square>
      </div>
    </div>
  );
};
export default TicTacToe;
