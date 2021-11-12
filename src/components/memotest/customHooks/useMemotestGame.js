import React, { useState } from 'react';
import cardArray from '../constants/initial-cards';

const createInitialCards = () => {
    let allCards = cardArray.concat(cardArray);
    let newCards = allCards.sort(() => 0.5 - Math.random());
    return newCards;
}

const useMemotestGame = () => {
    const [cards, setCards] = useState(createInitialCards);
    const [isFlipped, setIsFlipped] = useState([false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false]);
    const [currentPairs, setCurrentPairs] = useState([]);
    const [previousID, setPreviousID] = useState(null);
    const [animating, setAnimating] = useState(false);
    const [wonPairs, setWonPairs] = useState(0);
    const gameEnded = wonPairs > 7;

    const handleCard = (id, alt) => {
        let newIsPair = [...currentPairs, alt];
        setCurrentPairs(newIsPair);

        let newIsFlipped = [...isFlipped];
        newIsFlipped.splice(id, 1, true);
        setIsFlipped(newIsFlipped);

        if(previousID === null) {
            setPreviousID(id);
       }

        if(newIsPair.length === 2) {
            if(newIsPair[0] === newIsPair[1]) {
                setWonPairs(wonPairs + 1);
                setCurrentPairs([]);
                setPreviousID(null);
            } else {
                setAnimating(true);
                setTimeout(() => {
                    setCurrentPairs([]);
                    newIsFlipped.splice(id, 1, false);
                    newIsFlipped.splice(previousID, 1, false);
                    setIsFlipped(newIsFlipped);
                    setPreviousID(null);
                    setAnimating(false);
                }, 750);
            }
        }
    }

    const restart = () => {
        console.log('restart')
        setCards(createInitialCards);
        setCurrentPairs([]);
        setIsFlipped([false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false]);
        setWonPairs(0);
        setPreviousID(null);
        setAnimating(false);
    }

    return { cards, handleCard, isFlipped, gameEnded, animating, restart};
  }

export default useMemotestGame;