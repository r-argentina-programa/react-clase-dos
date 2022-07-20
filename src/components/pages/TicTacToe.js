import React, {useState} from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import './TicTacToe.css';
import FancyButton from '../small/FancyButton';

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

const WinnerCard = ({ show, winner, onRestart = () => {} }) => {
  return (
    <div className={cx('winner-card', { 'winner-card--hidden': !show })}>
      <span className="winner-card-text">
        {winner ? `Player ${winner} has won the game!` : "It's a tie!"}
      </span>
      <FancyButton onClick={onRestart}>Play again?</FancyButton>
    </div>
  );
};

WinnerCard.propTypes = {
  show: PropTypes.bool.isRequired,
  winner: PropTypes.oneOf(['X', 'O']),
  onRestart: PropTypes.func,
};

const getWinner = tiles => {
  const winningSolutions = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
  ];

  for (let i=0;i<winningSolutions.length;i++) {
    let  [p1, p2, p3] = winningSolutions[i];
    if(tiles[p1] && tiles[p1] === tiles[p2] && tiles[p1] === tiles[p3]){
      return tiles[p1];
    }
  }
  return null;
};

const useTicTacToeGameState = initialPlayer => {
  const [tiles, setTiles] = useState(['','','','','','','','','']);
  const [currentPlayer, setCurrentPlayer] = useState(initialPlayer);
  const winner = getWinner(tiles);
  const gameEnded = (winner !== null) ? true : false;

  const setTileTo = (tileIndex, player = currentPlayer) => {
     if (tiles[tileIndex] === '') {
      const newTiles = [...tiles];
      newTiles[tileIndex] = player;
      setTiles(newTiles);
      setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X');
      getWinner(newTiles);
    }
  };

  const restart = () => {
    setTiles(['', '', '', '', '', '', '', '', '']);
    setCurrentPlayer('X');
  };

  return { tiles, currentPlayer, winner, gameEnded, setTileTo, restart };
};

const TicTacToe = () => {
  const { tiles, winner, gameEnded, setTileTo, restart } = useTicTacToeGameState('X');
  return (
    <div className="tictactoe">

      <WinnerCard
        show={gameEnded}
        winner={winner}
        onRestart={restart}
      />

      <div className="tictactoe-row">
         <Square value={tiles[0]} onClick={() => setTileTo(0)} />
         <Square value={tiles[1]} onClick={() => setTileTo(1)} />
         <Square value={tiles[2]} onClick={() => setTileTo(2)} />
      </div>
      <div className="tictactoe-row">
          <Square value={tiles[3]} onClick={() => setTileTo(3)} />
          <Square value={tiles[4]} onClick={() => setTileTo(4)} />
          <Square value={tiles[5]} onClick={() => setTileTo(5)} />
      </div>
      <div className="tictactoe-row">
          <Square value={tiles[6]} onClick={() => setTileTo(6)} />
          <Square value={tiles[7]} onClick={() => setTileTo(7)} />
          <Square value={tiles[8]} onClick={() => setTileTo(8)} />
      </div>
    </div>
  );
};

export default TicTacToe;