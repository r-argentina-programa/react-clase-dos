import React, { useEffect } from 'react';
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
  winner: PropTypes.oneOf(['X', 'O','']),
  onRestart: PropTypes.func,
};

const getWinner = tiles => {
  // calcular el ganador del partido a partir del estado del tablero
  // (existen varias formas de calcular esto, una posible es listar todos los
  // casos en los que un jugador gana y ver si alguno sucede)
  let ganador = ''

  const filaCompleta = (tiles) => {
    tiles.forEach(filaCuadros => {
      if(filaCuadros.every(tile => tile === 'X')){
        ganador=filaCuadros[0]
      }else if(filaCuadros.every(tile => tile === 'O')){
        ganador=filaCuadros[0]
      }
    })
  }
  const columnaCompleta = (fila1,fila2,fila3) => {
    fila1.forEach((e,i)=>{
      if(e === fila2[i] && e === fila3[i] && ganador === ''){
        ganador=e
      }
    })
  }
  const diagonalCompleta = (fila1,fila2,fila3) => {
    if(fila1[0] === fila2[1] && fila1[0] === fila3[2]){
      ganador=fila1[0]
    }else if(fila1[2] === fila2[1] && fila1[2] === fila3[0]){
      ganador=fila1[2]
    }
  }


  filaCompleta(tiles)
  if(ganador === ""){columnaCompleta(tiles[0],tiles[1],tiles[2])}
  if(ganador === ""){diagonalCompleta(tiles[0],tiles[1],tiles[2])}

  return ganador;
};

const evaluarEmpate = (tiles) => {
  let contTilesPlayed = 0

  tiles.forEach(filas => {
    filas.forEach(tile => {
      tile !== '' && contTilesPlayed++
    })
  })

  if(contTilesPlayed === 9){
    return true
  }else{return false}
}

const useTicTacToeGameState = initialPlayer => {
  const [tiles, setTiles] = React.useState(['','','','','','','','',''].chunk(3))
  const [currentPlayer, setCurrentPlayer] = React.useState(initialPlayer);
  const [winner, setWinner] = React.useState(getWinner(tiles));
  const [gameEnded, setGameEnded] = React.useState(false);

  const setTileTo = (tileIndexMenor, tileIndexMayor, player) => {
    let newTiles=[...tiles]
    if(newTiles[tileIndexMayor][tileIndexMenor] === ''){
      newTiles[tileIndexMayor][tileIndexMenor] = player
      setTiles(newTiles)
      setCurrentPlayer(currentPlayer=== 'X' ? 'O' : 'X')
    }else{alert('Casilla ya jugada')}
  };

  useEffect(()=>{
    setWinner(getWinner(tiles))
    setGameEnded(
      winner !== '' ? true : evaluarEmpate(tiles)
    )
  },[tiles,winner])

  const restart = () => {
    setTiles(['','','','','','','','',''].chunk(3))
    setWinner('')
    setGameEnded(false)
  };

  // por si no reconocen esta sintáxis, es solamente una forma más corta de escribir:
  // { tiles: tiles, currentPlayer: currentPlayer, ...}
  return { tiles, currentPlayer, winner, gameEnded, setTileTo, restart };
};

const TicTacToe = () => {
  const { tiles, currentPlayer, winner, gameEnded, setTileTo, restart } = useTicTacToeGameState('X');

  return (
    <div className="tictactoe">
      {/* Este componente debe contener la WinnerCard y 9 componentes Square, 
      separados en tres filas usando <div className="tictactoe-row">{...}</div> 
      para separar los cuadrados en diferentes filas */}
      <WinnerCard show={gameEnded} winner={winner} onRestart={()=>{restart()}}/> 
      {tiles.map((filaDeCuadros,indexMayor)=>(
        <div className='tictactoe-row' key={indexMayor}>
          {filaDeCuadros.map((e,indexMenor)=>(
            <Square value={e} onClick={()=>{setTileTo(indexMenor,indexMayor,currentPlayer)}}  key={indexMenor}/>
          ))}
        </div>
      ))}
    </div>
  );
};

Object.defineProperty(Array.prototype, 'chunk', {
  value: function(chunkSize) {
    var R = [];
    for (var i = 0; i < this.length; i += chunkSize)
      R.push(this.slice(i, i + chunkSize));
    return R;
  }
});

export default TicTacToe;

//Problemas con game ended