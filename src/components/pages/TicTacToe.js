import React from 'react';
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
  // Esta propiedad decide si el componente se muestra o está oculto
  // También se podría mostrar el componente usando un if (&&), pero usamos esta prop para mostrar los estilos correctamente.
  show: PropTypes.bool.isRequired,
  winner: PropTypes.oneOf(['X', 'O']),
  onRestart: PropTypes.func,
};

const getWinner = (tiles, player) => {
  // calcular el ganador del partido a partir del estado del tablero
  // (existen varias formas de calcular esto, una posible es listar todos los
  // casos en los que un jugador gana y ver si alguno sucede)
  const posibleWinner = player === 'X' ? 'O' : 'X';

  const getVerticalWin = (tiles, player) => {
    for (let columnIndex = 0; columnIndex < 3; columnIndex++) {
      if (
        tiles[columnIndex] === player && tiles[columnIndex + 3] === player && tiles[columnIndex + 6] === player
      ) {
        return true;
      }
    }
  }

  const getHorizontalWin = (tiles, player) => {
    for (let rowIndex = 0; rowIndex < 7; rowIndex += 3) {
      if (
        tiles[rowIndex] === player && tiles[rowIndex + 1] === player && tiles[rowIndex + 2] === player
      ) {
        return true;
      }
    }
  }
  
  const getDiagonalWin = (tiles, player) => {
    if (tiles[4] === player) {
      if (
        tiles[0] === player && tiles[8] === player
      ) {
        return true;
      }
      if (
        tiles[2] === player && tiles[6] === player
      ) {
        return true;
      }
    }
  }

  if (getVerticalWin(tiles, posibleWinner)) {
    return posibleWinner;
  }
  if (getHorizontalWin(tiles, posibleWinner)) {
    return posibleWinner;
  }
  if (getDiagonalWin(tiles, posibleWinner)) {
    return posibleWinner;
  }
    return null;
};

const useTicTacToeGameState = initialPlayer => {
  const [tiles, setTiles] = React.useState(['','','','','','','','',''])
  const [currentPlayer, setCurrentPlayer] = React.useState(initialPlayer);
  const winner = getWinner(tiles, currentPlayer);
  const freeTilesLeft = tiles.filter(tile => tile === '').length !== 0;
  const gameEnded = winner !== null || !freeTilesLeft;

  const setTileTo = (tileIndex, player) => {
    // convertir el tile en la posición tileIndex al jugador seleccionado
    // ejemplo: setTileTo(0, 'X') -> convierte la primera casilla en 'X'
    if (!gameEnded) {
      if (tiles[tileIndex] === '') {
        setTiles([...tiles.slice(0, tileIndex), player, ...tiles.slice(tileIndex + 1)]);
        setCurrentPlayer(player === 'X' ? 'O' : 'X');
      }
    }
  };
  const restart = () => {
    // Reiniciar el juego a su estado inicial
    setTiles(['','','','','','','','','']);
  };

  // por si no reconocen esta sintáxis, es solamente una forma más corta de escribir:
  // { tiles: tiles, currentPlayer: currentPlayer, ...}
  return { tiles, currentPlayer, winner, gameEnded, setTileTo, restart };
};

const TicTacToe = () => {
  const { tiles, currentPlayer, winner, gameEnded, setTileTo, restart } = useTicTacToeGameState('O');
  // const { tiles, currentPlayer, winner, gameEnded, setTileTo, restart } = useTicTacToeGameState('X');
  return (
    <React.Fragment>
    <div className="tictactoe">
      {/* Este componente debe contener la WinnerCard y 9 componentes Square, 
      separados en tres filas usando <div className="tictactoe-row">{...}</div> 
      para separar los cuadrados en diferentes filas */}
      <WinnerCard show={gameEnded} winner={winner} onRestart={restart}/>
    <div className="tictactoe-row">
      <Square value={tiles[0]} onClick={() => setTileTo(0, currentPlayer)}/>
      <Square value={tiles[1]} onClick={() => setTileTo(1, currentPlayer)}/>
      <Square value={tiles[2]} onClick={() => setTileTo(2, currentPlayer)}/>
    </div>
    <div className="tictactoe-row">
      <Square value={tiles[3]} onClick={() => setTileTo(3, currentPlayer)}/>
      <Square value={tiles[4]} onClick={() => setTileTo(4, currentPlayer)}/>
      <Square value={tiles[5]} onClick={() => setTileTo(5, currentPlayer)}/>
    </div>
    <div className="tictactoe-row">
      <Square value={tiles[6]} onClick={() => setTileTo(6, currentPlayer)}/>
      <Square value={tiles[7]} onClick={() => setTileTo(7, currentPlayer)}/>
      <Square value={tiles[8]} onClick={() => setTileTo(8, currentPlayer)}/>
    </div>
    </div>
    </React.Fragment>
  );
};
export default TicTacToe;
