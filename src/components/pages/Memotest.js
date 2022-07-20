import React from 'react';
import Board from '../memotest/board/Board';
import Timer from '../memotest/score/Timer';
import WinnerScore from '../memotest/score/WinnerScore';
import useMemotestGame from '../memotest/customHooks/useMemotestGame';
import useTimer from '../memotest/customHooks/useTimer';
import './Memotest.css';

function Memotest() {
  const { cards, handleCard, gameEnded, animating, restart } = useMemotestGame();
  const { minutes, seconds } = useTimer(gameEnded);
  let result = 0;

  if(gameEnded) {
    let totalMinutes = (minutes !== 0 && minutes < 10) ?  `0${minutes}` : '';
    let totalSeconds = seconds > 10 ? seconds : `0${seconds}`;
        if(totalMinutes === ''){
            result = totalSeconds + ' segundos';
        } else {
            result = totalMinutes + ' minutos con ' + totalSeconds + ' segundos';
        }
  }

  return (
    <div className="memotest-app">
      <WinnerScore
        show={gameEnded}
        restart={restart}
        result={result}
      />
      <section className={'memotest ' + (gameEnded ? 'hidden' : '')}>
        <Board
          cards={cards}
          handleCard={handleCard}
          animating={animating}
          gameEnded={gameEnded}
        />
      </section>
      <Timer
        minutes={minutes}
        seconds={seconds}
        gameEnded={gameEnded}
        onRestart={restart}
      />
    </div>
  );
}


export default Memotest;