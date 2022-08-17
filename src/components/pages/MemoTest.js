import React, { useEffect, useState } from "react";
import colors from "../data/colors";
import FancyButton from "../small/FancyButton";
import cx from 'classnames';
import './MemoTest.css'


function Square(props) {
  return (
    <div
      className={`memotest-square ${props.showed ? props.color : ''}`}
      onClick={() => props.showed ? () => { } : props.show(props.id, props.color)} >

    </div>
  );
}

function DiscardedSquare() {
  return (
    <div
      className="memotest-square discarded">
    </div>
  );
}

function setGame() {
  const colorsData = colors;
  const clonedColors = colorsData.map(element => (
    {
      ...element,
      id: element.id + 6
    })
  )
  const repeatedColors = colors.concat(clonedColors)
  const randomizedColors = repeatedColors.sort(() => (
    0.5 - Math.random()
  ))
  return randomizedColors;
}

const WinnerCard = ({ show, onRestart = () => { } }) => {
  return (
    <div className={cx('winner-card', { 'winner-card--hidden': !show })}>
      <FancyButton onClick={onRestart}>Play again?</FancyButton>
    </div>
  );
};

export default function MemoTest() {
  const [colors, setColors] = useState(setGame())
  const [selectedColors, setSelectedColors] = useState([])

  useEffect(() => {
    if (selectedColors.length === 2) {
      selectedColors[0] === selectedColors[1] ?
        discardColors(selectedColors[0]) :
        unselectColors()
    }

  }, [selectedColors, unselectColors])

  function manageInput(color) {
    setSelectedColors((prevColors) => (
      [...prevColors, color]
    ))
  }

  function unselectColors() {
    setTimeout(() => {
      setColors(colors.map((color) => (
        { ...color, on: false }
      )))
      setSelectedColors([])
    }, 200)
  }

  function discardColors(selectedColor) {
    setTimeout(() => {
      setColors((prevColors) => (
        prevColors.map((color) => (
          color.color === selectedColor ?
            { ...color, discarded: true } :
            color
        ))
      ))
      setSelectedColors([]);
    }, 200)
  }


  function showColor(id, color) {
    setColors(prevColors => (
      prevColors.map((color) => (
        color.id === id ? { ...color, on: !color.on } : color
      ))
    ))

    manageInput(color)
  }

  function restart() {
    setColors(setGame())
  }

  return (
    <div className="memotest">
      {colors.every((element) => (
        element.discarded
      )) &&
        <WinnerCard
          onRestart={restart}
          show={true} />}
      {colors.map((element) => (
        element.discarded ?
          <DiscardedSquare
            key={element.id} /> :
          <Square
            key={element.id}
            id={element.id}
            color={element.color}
            showed={element.on}
            show={showColor}
          />
      ))}


    </div>
  );
}