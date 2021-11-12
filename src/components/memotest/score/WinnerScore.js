import React from 'react';
import './WinnerScore.css';

const WinnerScore = ({ show, result }) => {
    return (
      <div className={'winner-score ' + (show ? 'winner-score--hidden': '')}>
        <span className="winner-score-text">
          Has completado el juego en {result}
        </span>
      </div>
    );
  };

export default WinnerScore;