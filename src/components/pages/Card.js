import React from "react";
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
