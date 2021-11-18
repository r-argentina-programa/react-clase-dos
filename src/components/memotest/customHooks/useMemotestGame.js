import React, { useState } from 'react';
import cardArray from '../constants/initial-cards';

const createInitialCards = () => {
    let allCards = [];

    cardArray.forEach(({name, img, flipped}) => {
        allCards.push({
            name,
            img,
            flipped,
            key: `${name}-1`
        });
        allCards.push({
            name,
            img,
            flipped,
            key: `${name}-2`
        });
    })

    let newCards = allCards.sort(() => 0.5 - Math.random());
    return newCards;
}

const useMemotestGame = () => {
    const [cards, setCards] = useState(createInitialCards);
    const [currentPairs, setCurrentPairs] = useState([]);
    const [animating, setAnimating] = useState(false);
    const [wonPairs, setWonPairs] = useState(0);
    const gameEnded = wonPairs >= (cards.length / 2);

    const handleCard = (card, id) => {
        let newIsPair = [...currentPairs, {card, id}];
        setCurrentPairs(newIsPair);

        const isFlipped = {...card, flipped: true};
        let cardsCopy = [...cards];
        cardsCopy.splice(id, 1, isFlipped);
        setCards(cardsCopy);

        if(newIsPair.length === 2) {
            if(newIsPair[0].card.name === newIsPair[1].card.name) {
                setWonPairs(wonPairs + 1);
                setCurrentPairs([]);

            } else {
                setAnimating(true);
                setTimeout(() => {
                    setAnimating(false);
                    cardsCopy.splice(newIsPair[0].id, 1, newIsPair[0].card);
                    cardsCopy.splice(newIsPair[1].id, 1, newIsPair[1].card);
                    setCards(cardsCopy);
                    setCurrentPairs([]);
                }, 750);
            }
        }
    }

    const restart = () => {
        setCards(createInitialCards);
        setCurrentPairs([]);
        setWonPairs(0);
        setAnimating(false);
    }

    return { cards, handleCard, gameEnded, animating, restart};
  }

export default useMemotestGame;