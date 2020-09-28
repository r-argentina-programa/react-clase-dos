import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import './Memotest.css';

const Square = ({ className, onClick = () => {} }) => {
    return (
      <button onClick={onClick} className={className = "card"}>
      </button>
    );
};

const rearrangeCards = (deck) => {
    for (let i = deck.length -1; i > 0; i -= 1) {
        const randomIndex = Math.floor((Math.random()) * (i + 1))
        const newBoard = deck[randomIndex];
        deck[randomIndex] = deck[i]
        deck[i] = newBoard
    }
}

const createDeckOfCards = () => {
    const initialDeckofCards = [
        'red', 
        'red',
        'blue', 
        'blue',
        'cyan',
        'cyan', 
        'violet',
        'violet',
        'green',
        'green', 
        'rose',
        'rose',
        'black',
        'black',
        'brown',
        'brown'
    ]
}

/* const WinnerCard
const useMemotestState = (card) => {
    const [tiles, setTiles] = React.useState(['','','','','','','','','','','',''])
    const [boardCard, setCard] = React.useState(card)
    const freeTilesLeft = tiles.filter(tile => tile === '').length !== 0;

}*/ 

const Memotest = () => {
    return (
        <React.Fragment>
           <div className="memotest">
                <div className="row">
                    <Square></Square>
                    <Square></Square>
                    <Square></Square>
                    <Square></Square>
                </div>
                <div className="row">
                    <Square></Square>
                    <Square></Square>
                    <Square></Square>
                    <Square></Square>    
                </div>
                <div className="row">
                    <Square></Square>
                    <Square></Square>
                    <Square></Square>
                    <Square></Square> 
                </div>
                <div className="row">
                    <Square></Square>
                    <Square></Square>
                    <Square></Square>
                    <Square></Square> 
                </div>
            </div> 
        </React.Fragment>
    );
};

export default Memotest;
