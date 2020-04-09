import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import './TicTacToe.css';
import FancyButton from '../small/FancyButton';
import { validateWinner } from './validate-winner';

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
  if (validateWinner(tiles, player)) {
   return player;
  }
  
  return null;
};

const useTicTacToeGameState = initialPlayer => {
  const [tiles, setTiles] = React.useState(['', '', '', '', '', '', '', '', '']);
  const [currentPlayer, setCurrentPlayer] = React.useState(initialPlayer);
  const winner = getWinner(tiles, currentPlayer);
  const gameEnded = (winner || !tiles.includes('')) ? true : false;

  const setTileTo = (tileIndex, player = currentPlayer) => {
    if (tiles[tileIndex] === '') {
      const newTiles = [...tiles];
      newTiles[tileIndex] = player
      setTiles([...newTiles]);
      setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X');
    }
    // convertir el tile en la posición tileIndex al jugador seleccionado
    // ejemplo: setTileTo(0, 'X') -> convierte la primera casilla en 'X'
  };
  const restart = () => {
    setTiles(['', '', '', '', '', '', '', '', '']);
    setCurrentPlayer('X');
  };

  // por si no reconocen esta sintáxis, es solamente una forma más corta de escribir:
  // { tiles: tiles, currentPlayer: currentPlayer, ...}
  return { tiles, currentPlayer, winner, gameEnded, setTileTo, restart };
};

const TicTacToe = () => {
  const { tiles, currentPlayer, winner, gameEnded, setTileTo, restart } = useTicTacToeGameState('X');
  return (
    <div className="tictactoe">
      <h1>Turno de: {currentPlayer}</h1>

      <WinnerCard winner={winner} onRestart={restart} show={gameEnded}></WinnerCard>
      
      <div className={cx('tictactoe-row', { 'winner-card--hidden': gameEnded })}>
        <Square value={tiles[0]} onClick={() => setTileTo(0)}></Square>
        <Square value={tiles[1]} onClick={() => setTileTo(1)}></Square>
        <Square value={tiles[2]} onClick={() => setTileTo(2)}></Square>
      </div>
      <div className={cx('tictactoe-row', { 'winner-card--hidden': gameEnded })}>
        <Square value={tiles[3]} onClick={() => setTileTo(3)}></Square>
        <Square value={tiles[4]} onClick={() => setTileTo(4)}></Square>
        <Square value={tiles[5]} onClick={() => setTileTo(5)}></Square>
      </div>
      <div className={cx('tictactoe-row', { 'winner-card--hidden': gameEnded })}>
        <Square value={tiles[6]} onClick={() => setTileTo(6)}></Square>
        <Square value={tiles[7]} onClick={() => setTileTo(7)}></Square>
        <Square value={tiles[8]} onClick={() => setTileTo(8)}></Square>
      </div>
    </div>
  );
};

/* Este componente debe contener la WinnerCard y 9 componentes Square, 
      separados en tres filas usando <div className="tictactoe-row">{...}</div> 
      para separar los cuadrados en diferentes filas */

export default TicTacToe;
