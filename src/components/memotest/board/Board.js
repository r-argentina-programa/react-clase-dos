import React from 'react';
import Card from './Card';
import background from '../assets/shenlong.jpg';
import './Board.css';

const Board = ({cards, handleCard, flipped, animating }) => {
    const boardStyle = {
        backgroundImage: 'url(' + background + ')',
        backgroundSize: '100% 100%'
      };

    return(
        <section className='board' style={boardStyle}  >
            {
                cards.map((card, i) => (
                    <Card
                        onClick={handleCard}
                        flipped={flipped[i]}
                        animating={animating}
                        key={`${card.name}-${i}`}
                        alt={card.name}
                        src={card.img}
                        id={i}
                    />
                ))
            }
        </section>
    )
}

export default Board;