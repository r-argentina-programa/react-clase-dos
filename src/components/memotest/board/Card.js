import React from 'react';
import front from '../assets/fondo.jpg';
import './Card.css';

const Card = ({src, alt, id, flipped, onClick, animating}) => {
    return(
        <div
            className={'cards ' + (flipped ? 'flip' : '')}
            key={id}
            id={id}
        >
        <img src={front} alt={alt} id="front" onClick={() => (!animating && onClick(id, alt))}/>
        <img src={src} alt={alt} id="back" />
        </div>
    )
}

export default Card;