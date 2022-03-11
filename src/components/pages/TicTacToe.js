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
  show: PropTypes.bool.isRequired,
  winner: PropTypes.oneOf(['X', 'O']),
  onRestart: PropTypes.func,
};

const getWinner = tiles => {
  const winningCombinations = [
    [tiles[0],tiles[1],tiles[2]],
    [tiles[3],tiles[4],tiles[5]],
    [tiles[6],tiles[7],tiles[8]],

    [tiles[0],tiles[3],tiles[6]],
    [tiles[1],tiles[4],tiles[7]],
    [tiles[2],tiles[5],tiles[8]],

    [tiles[0],tiles[4],tiles[8]],
    [tiles[2],tiles[4],tiles[6]],
  ]
  let win=null;
  if(tiles.includes('X')||tiles.includes('O')){
  winningCombinations.forEach((combination)=>{
    if(combination.includes('X')||combination.includes('O')){
      if(combination[0]===combination[1] && combination[0]===combination[2])
      {
        win=combination[0];

      }    
    }
  })
  }
  return win;
};

const useTicTacToeGameState = initialPlayer => {
  const [tiles,setTiles] = React.useState(['','','','','','','','','']);
  const [currentPlayer,setCurrentPlayer]= React.useState(initialPlayer);
  const winner=getWinner(tiles);
  const gameEnded = !(tiles.includes('')) || winner!==null;

  const setTileTo = (tileIndex, player) => {
    if (tiles[tileIndex]===''){
    tiles[tileIndex] = player;
    setTiles(tiles)
    setCurrentPlayer(player==='X'?'O':'X')
       }

    };
  const restart = () => {
    setTiles(['','','','','','','','',''])
    setCurrentPlayer(initialPlayer='X')
      };

  return { tiles, currentPlayer, winner, gameEnded, setTileTo, restart };
};

const TicTacToe = () => {
  const { tiles, currentPlayer, winner, gameEnded, setTileTo, restart } = useTicTacToeGameState('X');
  const tilesForRow=[]
  tilesForRow[0]=tiles.slice(0,3)
  tilesForRow[1]=tiles.slice(3,6)
  tilesForRow[2]=tiles.slice(6)

  return (
    <div  className="tictactoe">
      <WinnerCard show={gameEnded} winner={winner} onRestart={restart}/>
      {tilesForRow.map((row,indexA)=>
        <div key={'row'+indexA} className='tictactoe-row'>
          {row.map((tile, indexB)=>
             <Square
            key={(indexA*3)+indexB}
            value={tile}
            onClick={()=>{setTileTo((indexA*3)+indexB,currentPlayer)}} />
          )}
          </div>

       )}
      
              </div>
  );
};
export default TicTacToe;
