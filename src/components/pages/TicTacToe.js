import React, { useState } from 'react';
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

const Square = ({ value, onClick = () => { } }) => {
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

const WinnerCard = ({ show, winner, onRestart = () => { } }) => {
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
  // Esta propiedad decide si el componente se muestra o está oculto
  // También se podría mostrar el componente usando un if (&&), pero usamos esta prop para mostrar los estilos correctamente.
  show: PropTypes.bool.isRequired,
  winner: PropTypes.oneOf(['X', 'O', '']),
  onRestart: PropTypes.func,
};

const getWinner = (tiles, currentPlayer) => {
  if (
    tiles[0] === tiles[1] && tiles[0] === tiles[2] && tiles[0] !== '' ||
    tiles[3] === tiles[4] && tiles[3] === tiles[5] && tiles[3] !== '' ||
    tiles[6] === tiles[7] && tiles[6] === tiles[8] && tiles[6] !== ''
  ) {
    return [true, currentPlayer === 'X' ? 'O' : 'X']
  }
  else if (
    tiles[0] === tiles[3] && tiles[0] === tiles[6] && tiles[0] !== '' ||
    tiles[1] === tiles[4] && tiles[1] === tiles[7] && tiles[1] !== '' ||
    tiles[2] === tiles[5] && tiles[2] === tiles[8] && tiles[2] !== ''
  ) {
    return [true, currentPlayer === 'X' ? 'O' : 'X']
  }
  else if (
    tiles[0] === tiles[4] && tiles[0] === tiles[8] && tiles[0] !== '' ||
    tiles[2] === tiles[4] && tiles[2] === tiles[6] && tiles[2] !== ''
  ) {
    return [true, currentPlayer === 'X' ? 'O' : 'X']
  }
  else if (
    tiles.filter((item) => item !== '').length === 9
  ) {
    return [true, '']
  }
  else {
    return [false, '']
  }
  // calcular el ganador del partido a partir del estado del tablero
  // (existen varias formas de calcular esto, una posible es listar todos los
  // casos en los que un jugador gana y ver si alguno sucede)
  // return null;
};

const useTicTacToeGameState = initialPlayer => {
  const [tiles, setTiles] = useState(['', '', '', '', '', '', '', '', ''])
  const [player, setPlayer] = useState(initialPlayer);

  const currentPlayer = player;
  const winner = getWinner(tiles, currentPlayer);
  const gameEnded = winner[0] === true ? true : false;

  const setTileTo = (tileIndex, player) => {
    setTiles(tiles => tiles.map((element, index) => {
      return index === tileIndex ? player : element
    }));

    setPlayer(
      player === 'X' ? 'O' : 'X'
    )
    // convertir el tile en la posición tileIndex al jugador seleccionado
    // ejemplo: setTileTo(0, 'X') -> convierte la primera casilla en 'X'
  };
  const restart = () => {
    if (gameEnded === true) {
      setTiles(['', '', '', '', '', '', '', '', '']);
      setPlayer(initialPlayer);
    }
    // Reiniciar el juego a su estado inicial
  };

  // por si no reconocen esta sintáxis, es solamente una forma más corta de escribir:
  // { tiles: tiles, currentPlayer: currentPlayer, ...}
  return { tiles, currentPlayer, winner, gameEnded, setTileTo, restart };
};

const TicTacToe = () => {
  // const gameState = useTicTacToeGameState('X');
  const { tiles, currentPlayer, winner, gameEnded, setTileTo, restart } = useTicTacToeGameState('X');
  return (
    <div className="tictactoe">
      <WinnerCard
        show={gameEnded}
        winner={winner[1]}
        onRestart={restart}
      />
      {/* Este componente debe contener la WinnerCard y 9 componentes Square, 
      separados en tres filas usando <div className="tictactoe-row">{...}</div> 
      para separar los cuadrados en diferentes filas */}
      <div className='tictactoe-row'>
        <Square
          value={tiles[0]}
          onClick={() => { setTileTo(0, currentPlayer) }}
        />
        <Square
          value={tiles[1]}
          onClick={() => { setTileTo(1, currentPlayer) }}
        />
        <Square
          value={tiles[2]}
          onClick={() => { setTileTo(2, currentPlayer) }}
        />
      </div>
      <div className='tictactoe-row'>
        <Square
          value={tiles[3]}
          onClick={() => { setTileTo(3, currentPlayer) }}
        />
        <Square
          value={tiles[4]}
          onClick={() => { setTileTo(4, currentPlayer) }}
        />
        <Square
          value={tiles[5]}
          onClick={() => { setTileTo(5, currentPlayer) }}
        />
      </div>
      <div className='tictactoe-row'>
        <Square
          value={tiles[6]}
          onClick={() => { setTileTo(6, currentPlayer) }}
        />
        <Square
          value={tiles[7]}
          onClick={() => { setTileTo(7, currentPlayer) }}
        />
        <Square
          value={tiles[8]}
          onClick={() => { setTileTo(8, currentPlayer) }}
        />
      </div>
    </div>
  );
};
export default TicTacToe;
