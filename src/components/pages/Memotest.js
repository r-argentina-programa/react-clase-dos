import React, { useEffect, useState } from "react";
import "./Memotest.css";
import Card from "./Card";
import campazzo from "../../assets/memotest/campazzo.jpg";
import giannis from "../../assets/memotest/giannis.jpeg";
import ginobili from "../../assets/memotest/ginobili.jpeg";
import kobe from "../../assets/memotest/kobe.jpg";
import lebron from "../../assets/memotest/lebron.jpg";
import jordan from "../../assets/memotest/mj23.jpg";

// import para traer todas las imágenes y una función para generar un array de data porque si la traía de otro archivo me generaba problemas. solución?
// id en 0 para despues generarle uno según la posición en la que quede
function createPlayers() {
  const players = [
    {
      name: "Campazzo",
      url: campazzo,
      isPicked: false,
      id: 0,
      found: false,
    },
    {
      name: "Giannis",
      url: giannis,
      isPicked: false,
      id: 0,
      found: false,
    },
    {
      name: "Ginobili",
      url: ginobili,
      isPicked: false,
      id: 0,
      found: false,
    },
    {
      name: "Kobe",
      url: kobe,
      isPicked: false,
      id: 0,
      found: false,
    },
    {
      name: "LeBron",
      url: lebron,
      isPicked: false,
      id: 0,
      found: false,
    },
    {
      name: "Jordan",
      url: jordan,
      isPicked: false,
      id: 0,
      found: false,
    },
  ];
  return players;
}

const useMemotestState = () => {
  const [players, setPlayers] = useState([
    // spread dos veces para tener 2 imagenes de cada jugador
    ...createPlayers(),
    ...createPlayers(),
  ]);

  // useEffect para generar un array con los jugadores de forma aleatoria (solo al cargar por primera vez).
  // rompe las reglas de la programación funcional y la inmutabilidad?? los for y los if y los array y variables nuevas, etc.
  useEffect(() => {
    const randomizedPlayers = [];
    setPlayers((oldPlayers) => {
      for (let i = 0; i < oldPlayers.length; i++) {
        const randomPlayer =
          oldPlayers[Math.floor(Math.random() * oldPlayers.length)];
        let check = 0;
        randomizedPlayers.map(
          (player) => player.name === randomPlayer.name && check++
        );
        check < 2 ? randomizedPlayers.push(randomPlayer) : i--;
      }
      // otro map para asignarle id, si inicializo el objeto sin propiedad id y se la creo después, no me lo lee el map del handleClick
      const idRandomizedPlayers = randomizedPlayers.map((player, index) => ({
        ...player,
        id: index,
      }));
      return idRandomizedPlayers;
    });
  }, []);

  // function de dar click a una carta
  function handleClick(event) {
    const { target } = event;
    setPlayers((oldPlayers) =>
      oldPlayers.map((player) =>
        Number(target.id) === player.id
          ? { ...player, isPicked: !player.isPicked }
          : player
      )
    );
  }

  // chequear si ganó el juego
  const [founds, setFounds] = useState(0);
  const [gameEnded, setGameEnded] = useState(false);
  useEffect(() => {
    console.log(founds);
    founds === 6 && setGameEnded(true);
  }, [founds]);

  // comparar si las cartas elegidas son iguales,
  const [compareCards, setCompareCards] = useState([]);
  // un useEffect que corra cada vez que se elija una carta y en un state carga las cartas que se van a comparar
  useEffect(() => {
    setCompareCards(
      players.filter((player) => player.isPicked && !player.found)
    );
  }, [players]);

  // un useEffect para comparar las cartas elegidas
  useEffect(() => {
    if (compareCards.length === 2) {
      if (compareCards[0].name === compareCards[1].name) {
        setPlayers((oldPlayers) =>
          oldPlayers.map((player) =>
            player.name === compareCards[0].name
              ? { ...player, found: true }
              : player
          )
        );
        setFounds((oldFounds) => oldFounds + 1);
      } else {
        // ¿cómo hago para retrasar esto unos ms? para que la segunda imagen quede congelada y el usuario "la puede retener visualmente" un toque, y que no se de vuelta al instante? . setTimeout no me funciona.
        setPlayers((oldPlayers) =>
          oldPlayers.map((player) =>
            player.id === compareCards[0].id || player.id === compareCards[1].id
              ? { ...player, isPicked: false }
              : player
          )
        );
      }
    }
  }, [compareCards]);

  // lo que retorna el useMemotestState acá abajo
  return { players, handleClick, gameEnded };
};

const Memotest = () => {
  const { players, handleClick, gameEnded } = useMemotestState();

  const generateCards = players.map(({ url, isPicked, id, found }, index) => (
    <Card
      key={index}
      id={id}
      onClick={(event) => handleClick(event)}
      randomPlayer={url}
      isPicked={isPicked}
      found={found}
    />
  ));

  return (
    <>
      <main>
        {gameEnded && <div className="win-card">You've won!</div>}
        {!gameEnded && <div className="card-container">{generateCards}</div>}
      </main>
    </>
  );
};

export default Memotest;
