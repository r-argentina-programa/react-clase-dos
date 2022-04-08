import React from "react";
import "./Memotest.css";
import src from "../images/index.js";

let vidasDelJugador = 10;

const portadas = [
  { imgSrc: src.beatles, name: "beatles" },
  { imgSrc: src.blink182, name: "blink182" },
  { imgSrc: src.fkatwigs, name: "fka twigs" },
  { imgSrc: src.fleetwood, name: "fleetwood" },
  { imgSrc: src.joydivision, name: "joy division" },
  { imgSrc: src.ledzep, name: "led zeppelin" },
  { imgSrc: src.metallica, name: "metallica" },
  { imgSrc: src.pinkfloyd, name: "pink floyd" },
  { imgSrc: src.beatles, name: "beatles" },
  { imgSrc: src.blink182, name: "blink182" },
  { imgSrc: src.fkatwigs, name: "fka twigs" },
  { imgSrc: src.fleetwood, name: "fleetwood" },
  { imgSrc: src.joydivision, name: "joy division" },
  { imgSrc: src.ledzep, name: "led zeppelin" },
  { imgSrc: src.metallica, name: "metallica" },
  { imgSrc: src.pinkfloyd, name: "pink floyd" },
];

const Vidas = () => {
  return <span>Vidas:{vidasDelJugador}</span>;
};

const Carta = (props) => {
  return (
    <div className={props.carta} onClick={props.onClick} name={props.name}>
      {props.children}
    </div>
  );
};

const Cara = (props) => {
  return (
    <img
      className={props.cara}
      src={props.src}
      name={props.name}
      alt="portada"
    />
  );
};

const Reves = (props) => {
  return <div className={props.reves}></div>;
};

const GenerarCartas = () => {
  const datos = aleatorizar();
  return (
    <React.Fragment>
      <Vidas />
      <section>
        {datos.map((portada, i) => (
          <Carta
            key={i}
            name={portada.name}
            carta={"carta"}
            onClick={(e) => ChequearCarta(e.target)}
          >
            <Cara cara={"cara"} src={portada.imgSrc} />
            <Reves reves={"reves"} />
          </Carta>
        ))}
      </section>
    </React.Fragment>
  );
};

const aleatorizar = () => {
  const datos = portadas;
  datos.sort(() => Math.random() - 0.5);
  return datos;
};

const ChequearCarta = (carta) => {
  carta.classList.add("girarCarta");
  carta.classList.add("girado");

  const cartasGiradas = document.querySelectorAll(".girado");
  console.log(cartasGiradas);
  const girarCarta = document.querySelectorAll(".girarCarta");
  if (cartasGiradas.length === 2) {
    if (
      cartasGiradas[0].getAttribute("name") ===
      cartasGiradas[1].getAttribute("name")
    ) {
      cartasGiradas.forEach((carta) => {
        carta.classList.remove("girado");
        carta.style.pointerEvents = "none";
      });
    } else {
      cartasGiradas.forEach((carta) => {
        carta.classList.remove("girado");
        setTimeout(() => carta.classList.remove("girarCarta"), 1000);
      });
      vidasDelJugador--;
      document.querySelector("span").textContent = `Vidas: ${vidasDelJugador}`;
      if (vidasDelJugador === 0) {
        perder();
        resetear();
      }
    }
  }
  if (girarCarta.length === 16) {
    ganar();
    resetear();
  }
};

function perder() {
  alert("Perdiste");
}

function ganar() {
  alert("Ganaste");
}

const resetear = () => {
  let datos = aleatorizar();
  let caras = document.querySelectorAll(".cara");
  let cartas = document.querySelectorAll(".carta");
  document.querySelector("section").style.pointerEvents = "none";
  datos.forEach((item, index) => {
    cartas[index].classList.remove("girarCarta");
    setTimeout(() => {
      cartas[index].style.pointerEvents = "all";
      cartas[index].setAttribute("name", item.name);
      caras[index].src = item.imgSrc;
      document.querySelector("section").style.pointerEvents = "all";
    }, 1000);
  });
  vidasDelJugador = 10;
  document.querySelector("span").textContent = `Vidas: ${vidasDelJugador}`;
};

const Memotest = () => {
  return GenerarCartas();
};

export default Memotest;
