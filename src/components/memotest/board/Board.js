import React from 'react';
import Card from './Card';
import background from '../assets/shenlong.jpg';
import './Board.css';

const Board = ({cards, handleCard, animating }) => {
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
                        flipped={card.flipped}
                        animating={animating}
                        key={`${card.key}`}
                        alt={card.name}
                        src={card.img}
                        id={i}
                        card={card}
                    />
                ))
            }
        </section>
    )
}

export default Board;