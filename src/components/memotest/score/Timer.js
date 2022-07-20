import React from 'react';

const Timer = ({ minutes, seconds, gameEnded }) => {
    return(
        <section className={gameEnded ? 'hidden' : ''}>
            <p id="timer">
                Tiempo de juego: <span className="game-score">
                   {' '}{minutes < 10 ? `0${minutes}` : minutes}:{seconds < 10 ? `0${seconds}` : seconds}
                </span>
            </p>
        </section>
    )
}

export default Timer;