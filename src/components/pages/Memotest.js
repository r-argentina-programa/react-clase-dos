import React from "react";
import PropTypes from "prop-types";
import cx from "classnames";
import FancyButton from "../small/FancyButton";
import "./Memotest.css";

const Square = ({ value,alt, src,estado, onClick= ()=>{} }) => {
  const [className, setEstado]=React.useState('oculta')
  return (
    <div className="square casilla">
      <img

        onClickCapture={onClick}
        onClick={()=>{setEstado(estado)}}
        className={className}
        id={value}
        src={src}
        alt={alt}
      ></img>
    </div>
  );
};
Square.propTypes = {
  src: PropTypes.string,
  estado:PropTypes.string,
  value: PropTypes.number,
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



const chequearPareja=(cartas)=>{
  if(cartas[0]===cartas[1]){
    return 1
  } else {
    return 0
  }
}

const chequearVictoria = casillas =>{
  const victoria = casillas.every(casilla=>casilla.estado==='seleccionada')
return victoria
}

const ordenCartas = () => {
  const ordenCartas = [];
  while (ordenCartas.length < 16) {
    const indice = Math.floor(Math.random() * 16);
    const disponible = ordenCartas.every((carta) => carta !== indice);
    if (disponible) {
      ordenCartas.push(indice);
    }
  }
  return ordenCartas;
};
const juegoDeCartas = {
  0: {
    id: "django",
    src: "img/django.jpg",
    estado:'oculta'
  },
  1: {
    id: "hateful-eight",
    src: "img/hateful-eight.jpg",
    estado:'oculta'
  },

  2: {
    id: "jackie-brown",
    src: "img/jackie-brown.jpg",
    estado:'oculta'
  },
  3: {
    id: "kill-bill",
    src: "img/kill-bill.jpg",
    estado:'oculta'
  },
  4: {
    id: "once-upon-a-time-hollywood",
    src: "img/once-upon-a-time-hollywood.jpg",
    estado:'oculta'
  },
  5: {
    id: "pulp-fiction",
    src: "img/pulp-fiction.jpg",
    estado:'oculta'
  },
  6: {
    id: "reservoir-dogs",
    src: "img/reservoir-dogs.jpg",
    estado:'oculta'
  },
  7: {
    id: "inglorious-basterds",
    src: "img/inglorious-basterds.jpg",
    estado:'oculta'
  },
  8: {
    id: "django",
    src: "img/django.jpg",
    estado:'oculta'
  },
  9: {
    id: "hateful-eight",
    src: "img/hateful-eight.jpg",
    estado:'oculta'
  },
  10: {
    id: "jackie-brown",
    src: "img/jackie-brown.jpg",
    estado:'oculta'
  },
  11: {
    id: "kill-bill",
    src: "img/kill-bill.jpg",
    estado:'oculta'
  },
  12: {
    id: "once-upon-a-time-hollywood",
    src: "img/once-upon-a-time-hollywood.jpg",
    estado:'oculta'
  },
  13: {
    id: "pulp-fiction",
    src: "img/pulp-fiction.jpg",
    estado:'oculta'
  },
  14: {
    id: "reservoir-dogs",
    src: "img/reservoir-dogs.jpg",
    estado:'oculta'
  },
  15: {
    id: "inglorious-basterds",
    src: "img/inglorious-basterds.jpg",
    estado:'oculta'
  },
};
const useMemotestGameState = () => {
  
  const orden = ordenCartas();
  const juegoNuevo =orden.map(casilla=>
    casilla=juegoDeCartas[casilla]
  )
  const [casillas,setCasillas] = React.useState(juegoNuevo)

  const [intentos,setIntentos] = React.useState(0)  
  const [aciertos,setAciertos] = React.useState(0)
  const juegoTerminado = chequearVictoria(casillas)  
  const $cartasSeleccionadas = [];

  const seleccionarCarta= carta =>{
      casillas[carta.id].estado = 'seleccionada'
      setCasillas(casillas)
      console.log(casillas)
      console.log(juegoTerminado)
    }

  // const actualizarCartasSeleccionadas = (carta) => {
  //   if ((cartasArriba = 2)) {
  //     aciertos = aciertos + chequearPareja($cartasSeleccionadas);
  //     cartasArriba = 0;
  //     console.log(aciertos)
  //   }
  //   $cartasSeleccionadas.push(carta);
  //   cartasArriba++;
  //   console.log(cartasArriba);
  // };

  const restart = () => {
    setAciertos(0)
    setIntentos(0)
  };

  return {
    casillas,
    juegoDeCartas,
    juegoTerminado,
    seleccionarCarta,
    restart,
  };
};

const Memotest = () => {
  const {
    casillas,
    juegoTerminado,
    seleccionarCarta,
    restart,
  } = useMemotestGameState();

  const casillasPorFila = [
    casillas.slice(0, 4),
    casillas.slice(4, 8),
    casillas.slice(8, 12),
    casillas.slice(12),
  ];
  return (
    <div className="memotest">
      {casillasPorFila.map((row, indexA) => 
        <div className="memotest-row" key={"row" + indexA}>
          {row.map((casilla,indexB) => 
            <Square
              src={casilla.src}
              alt={casilla.id}
              className={casilla.estado}
              value={indexA*4+indexB}
              key={indexA*4+indexB}
              onClick={(e) => {
                seleccionarCarta(e.target);
              }}
            />
          )}
        </div>
      )}
    </div>
  );
};
export default Memotest;
