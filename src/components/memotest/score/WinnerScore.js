import React from 'react';
import FancyButton from '../../small/FancyButton';
import './WinnerScore.css';

const WinnerScore = ({ show, result, restart = () => {} }) => {
    return (
      <div className={'winner-score ' + (show ? 'winner-score--hidden': '')}>
        <span className="winner-score-text">
          Has completado el juego en {result}
        </span>
        <FancyButton onClick={restart}>¿Jugar de nuevo?</FancyButton>
      </div>
    );
  };

export default WinnerScore;