import React from "react";
import PropTypes from "prop-types";
import cx from "classnames";
import FancyButton from "../small/FancyButton";
import "./Memotest.css";

const Square = ({ value, alt, src, estado, onClick = () => {} }) => {
  return (
    <div className="tile">
      <img
        onClick={onClick}
        className={estado}
        id={value}
        src={src}
        alt={alt}
      ></img>
    </div>
  );
};
Square.propTypes = {
  src: PropTypes.string,
  estado: PropTypes.string,
  value: PropTypes.number,
  onClick: PropTypes.func,
};

const WinnerCard = ({ show, tiempo, intentos, onRestart = () => {} }) => {
  return (
    <div className={cx("winner-card", { "winner-card--hidden": !show })}>
      <span className="winner-card-text">
        {show
          ? `Ganaste! Tardaste ${tiempo} segundos y te tomó ${intentos} intentos`
          : ""}
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

const GameState = ({ tiempo, intentos }) => {
  return (
    <div>
      <div className="estado">{`Llevas ${tiempo} segundos jugando`}</div>
      <div className="estado">{`Intentos: ${intentos}`}</div>
    </div>
  );
};

const ocultarCartas = (cartas) => {
  cartas.forEach((carta) => {
    carta.estado = "oculta";
  });
};

const chequearPareja = (cartas) => {
  if (cartas[0].src === cartas[1].src) {
    cartas.forEach((carta) => {
      carta.estado = "acertada";
    });
    return true;
  } else {
    return false;
  }
};

const chequearVictoria = (casillas) => {
  const victoria = casillas.every((casilla) => casilla.estado === "acertada");

  return victoria;
};

const bloquearSeleccionCartas=(cartas)=>{
cartas.forEach((carta)=>
{if(carta.estado==='oculta'){carta.estado='desactivada'}
})
}
const habilitarSeleccionCartas=(cartas)=>{
  cartas.forEach((carta)=>
  {if(carta.estado==='desactivada'){carta.estado='oculta'}
  })
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
    estado: "oculta",
  },
  1: {
    id: "hateful-eight",
    src: "img/hateful-eight.jpg",
    estado: "oculta",
  },

  2: {
    id: "jackie-brown",
    src: "img/jackie-brown.jpg",
    estado: "oculta",
  },
  3: {
    id: "kill-bill",
    src: "img/kill-bill.jpg",
    estado: "oculta",
  },
  4: {
    id: "once-upon-a-time-hollywood",
    src: "img/once-upon-a-time-hollywood.jpg",
    estado: "oculta",
  },
  5: {
    id: "pulp-fiction",
    src: "img/pulp-fiction.jpg",
    estado: "oculta",
  },
  6: {
    id: "reservoir-dogs",
    src: "img/reservoir-dogs.jpg",
    estado: "oculta",
  },
  7: {
    id: "inglorious-basterds",
    src: "img/inglorious-basterds.jpg",
    estado: "oculta",
  },
  8: {
    id: "django",
    src: "img/django.jpg",
    estado: "oculta",
  },
  9: {
    id: "hateful-eight",
    src: "img/hateful-eight.jpg",
    estado: "oculta",
  },
  10: {
    id: "jackie-brown",
    src: "img/jackie-brown.jpg",
    estado: "oculta",
  },
  11: {
    id: "kill-bill",
    src: "img/kill-bill.jpg",
    estado: "oculta",
  },
  12: {
    id: "once-upon-a-time-hollywood",
    src: "img/once-upon-a-time-hollywood.jpg",
    estado: "oculta",
  },
  13: {
    id: "pulp-fiction",
    src: "img/pulp-fiction.jpg",
    estado: "oculta",
  },
  14: {
    id: "reservoir-dogs",
    src: "img/reservoir-dogs.jpg",
    estado: "oculta",
  },
  15: {
    id: "inglorious-basterds",
    src: "img/inglorious-basterds.jpg",
    estado: "oculta",
  },
};

const orden = ordenCartas();
const juegoNuevo = orden.map((casilla) => (casilla = juegoDeCartas[casilla]));

const useMemotestGameState = () => {
  const [casillas, setCasillas] = React.useState(juegoNuevo);
  const [tiempo, setTiempo] = React.useState(0);
  const [intentos, setIntentos] = React.useState(0);
  const juegoTerminado = chequearVictoria(casillas);
  let aumentoTiempo= tiempo
  const reloj = setInterval(() => {
    aumentoTiempo++
    setTiempo(aumentoTiempo);
  }, 1000);

  const seleccionarCarta = (index) => {
    if (casillas[index].estado === "oculta") {
      const casillasNuevas = [...casillas];
      casillasNuevas[index].estado = "seleccionada";
      setCasillas(casillasNuevas);
    }
    const $cartasSeleccionadas = casillas.filter(
      (carta) => carta.estado === "seleccionada"
    );

    if ($cartasSeleccionadas.length === 2) {
      const acierto = chequearPareja($cartasSeleccionadas);
      const sumaIntentos = intentos + 1;
      setIntentos(sumaIntentos);
      if (juegoTerminado) {
        return clearInterval(reloj);
      }
      if (!acierto) {
        bloquearSeleccionCartas(casillas)
        setCasillas(casillas)
        setTimeout(() => {
          ocultarCartas($cartasSeleccionadas);
          habilitarSeleccionCartas(casillas)
          setCasillas(casillas);
        }, 1000);
      }
    }
  };

  const restart = () => {
    setIntentos(0);
    setCasillas(juegoNuevo);
    setTiempo(0);
  };

  return {
    casillas,
    intentos,
    tiempo,
    juegoTerminado,
    seleccionarCarta,
    restart,
  };
};

const Memotest = () => {
  const {
    casillas,
    intentos,
    tiempo,
    juegoTerminado,
    seleccionarCarta,
    restart,
  } = useMemotestGameState();

  const casillasPorFila = [];
  casillasPorFila[0] = casillas.slice(0, 4);
  casillasPorFila[1] = casillas.slice(4, 8);
  casillasPorFila[2] = casillas.slice(8, 12);
  casillasPorFila[3] = casillas.slice(12);

  return (
    <div className="memotest">
      <GameState tiempo={tiempo} intentos={intentos} />
      <WinnerCard
        show={juegoTerminado}
        intentos={intentos}
        tiempo={tiempo}
        onRestart={restart}
      />
      {casillasPorFila.map((row, indexA) => (
        <div className="memotest-row" key={"row" + indexA}>
          {row.map((casilla, indexB) => (
            <Square
              src={casilla.src}
              alt={casilla.id}
              onClick={() => {
                seleccionarCarta(indexA * 4 + indexB);
              }}
              estado={casilla.estado}
              value={indexA * 4 + indexB}
              key={indexA * 4 + indexB}
            />
          ))}
        </div>
      ))}
    </div>
  );
};
export default Memotest;
