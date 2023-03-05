import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import './TicTacToe.css';
import FancyButton from '../small/FancyButton';

/* 
  Esta tarea consiste en hacer que el juego funcione, para lograr eso deben completar el componente 
  TicTacToe y el custom hook `useTicTacToeGameState`, que como ven solamente define algunas variables.

  Para completar esta tarea, es requisito que la FIRMA del hook no cambie.
  La firma de una función consiste en los argumentos que recibe y el resultado que devuelve.
  Es decir, este hook debe recibir el argumento initialPlayer y debe devolver un objeto con las siguientes propiedades:
  {
    tiles: // un array de longitud 9 que representa el estado del tablero (es longitud 9 porque el tablero es 3x3)
    currentPlayer: // un string que representa el jugador actual ('X' o 'O')
    winner: // el ganador del partido, en caso que haya uno. si no existe, debe ser `null`
    gameEnded: // un booleano que representa si el juego terminó o no
    setTileTo: // una función que se ejecutará en cada click
    restart: // una función que vuelve a setear el estado original del juego
  }

  Verán que los diferentes componentes utilizados están completados y llevan sus propios propTypes
  Esto les dará algunas pistas
*/

const Square = ({ value, onClick = () => {} }) => {
  return (
    <div onClick={onClick} className="square">
      {value}
    </div>
  );
};
Square.propTypes = {
  value: PropTypes.oneOf(['X', 'O', '']),
  onClick: PropTypes.func,
};

const WinnerCard = ({ show, player, winner, onRestart = () => {} }) => {
  return (
    <div className={cx('winner-card', { 'winner-card--hidden': !show })}>
      <span className="winner-card-text">{winner ? `Player ${player} has won the game!` : "It's a tie!"}</span>
      <FancyButton onClick={onRestart}>Play again?</FancyButton>
    </div>
  );
};

WinnerCard.propTypes = {
  show: PropTypes.bool.isRequired,
  player: PropTypes.oneOf(['X', 'O']),
  winner: PropTypes.bool,
  onRestart: PropTypes.func,
};

const getWinner = (tiles) => {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (tiles[a] && tiles[a] === tiles[b] && tiles[a] === tiles[c]) {
      return tiles[a];
    }
  }
  return null;
};

const useTicTacToeGameState = (initialPlayer) => {
  const [tiles, setTiles] = useState(Array(9).fill(''));
  const [currentPlayer, setCurrentPlayer] = useState(initialPlayer);
  const [turnGame, setTurnGame] = useState(true);
  const [gameEnded, setGameEnded] = useState(false);
  const [gameWin, setGameWin] = useState(true);

  useEffect(() => {
    const winner = getWinner(tiles);
    const isBoardFull = tiles.every((tile) => tile !== '');
    if (winner) {
      setGameEnded(true);
      setGameWin(true);
    } else if (isBoardFull) {
      setGameWin(false);
      setGameEnded(true);
    } else {
      setGameEnded(false);
    }
  }, [tiles]);

  const setTileTo = (tileIndex, turnGame) => {
    setTiles((prevTiles) => {
      const nextTiles = [...prevTiles];
      if (turnGame) {
        nextTiles[tileIndex] = 'X';
        setCurrentPlayer('X');
      } else {
        nextTiles[tileIndex] = 'O';
        setCurrentPlayer('O');
      }
      return nextTiles;
    });
  };
  function handleClick(i) {
    if (tiles[i]) {
      return;
    }
    setTileTo(i, turnGame);
    setTurnGame(!turnGame);
  }

  const restart = () => {
    setTiles(Array(9).fill(''));
    setTurnGame(true);
    setCurrentPlayer('X');
    setGameEnded(false);
  };

  return {
    tiles,
    currentPlayer,
    gameWin,
    setCurrentPlayer,
    gameEnded,
    setGameEnded,
    setTileTo,
    restart,
    turnGame,
    setTurnGame,
    handleClick,
  };
};

const TicTacToe = () => {
  const { tiles, currentPlayer, gameEnded, gameWin, restart, handleClick } = useTicTacToeGameState('X');

  return (
    <div className="tictactoe">
      {
        <React.Fragment>
          <WinnerCard show={gameEnded} player={currentPlayer} winner={gameWin} onRestart={restart} />
          <div className="tictactoe-row">
            {<Square value={tiles[0]} onClick={() => handleClick(0)} />}
            {<Square value={tiles[1]} onClick={() => handleClick(1)} />}
            {<Square value={tiles[2]} onClick={() => handleClick(2)} />}
          </div>
          <div className="tictactoe-row">
            {<Square value={tiles[3]} onClick={() => handleClick(3)} />}
            {<Square value={tiles[4]} onClick={() => handleClick(4)} />}
            {<Square value={tiles[5]} onClick={() => handleClick(5)} />}
          </div>
          <div className="tictactoe-row">
            {<Square value={tiles[6]} onClick={() => handleClick(6)} />}
            {<Square value={tiles[7]} onClick={() => handleClick(7)} />}
            {<Square value={tiles[8]} onClick={() => handleClick(8)} />}
          </div>
        </React.Fragment>
      }
    </div>
  );
};
export default TicTacToe;
