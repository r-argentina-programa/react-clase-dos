import React from "react";
import PropTypes from "prop-types";

import template from "../../assets/memotest/template-nba.jpg";
import "./Memotest.css";

function Card({ onClick, randomPlayer, isPicked, id, found }) {
  return (
    <>
      <div className="card" onClick={found ? () => {} : onClick} id={id}>
        <img
          src={template}
          alt="template"
          className={`front-card ${isPicked ? "frontFace" : ""} `}
        />
        <img
          src={randomPlayer}
          alt="player"
          className={`back-card ${isPicked ? "choosen" : ""} ${
            found ? "found" : ""
          }`}
        />
      </div>
    </>
  );
}
export default Card;

Card.propTypes = {
  onClick: PropTypes.func,
  randomPlayer: PropTypes.string,
  isPicked: PropTypes.bool,
  id: PropTypes.number,
  found: PropTypes.bool,
};
