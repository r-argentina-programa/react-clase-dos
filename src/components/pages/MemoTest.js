import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import './MemoTest.css';
import FancyButton from '../small/FancyButton';
import hitSound from '../../assents/audio/hit.mp3';
import failSound from '../../assents/audio/fail.mp3';
import selectSound from '../../assents/audio/select.mp3';
import winSound from '../../assents/audio/win.mp3';

const BarraInformativa = ({ hits, failures, onPlay, onRestart }) => {
  return (
    <div id="information-bar" className="d-md-inline-flex p-2 bg-warning">
      <div className="d-md-flex flex-md-row container">
        <div className="flex-md-row">
          <div className="col-sm mb-3 me-3">
            <FancyButton onClick={onPlay}>Play</FancyButton>
          </div>
          <div className="col-sm mb-3">
            <p className="text-center">
              Number of hits: <strong>{hits}</strong>
            </p>
          </div>
          <div className="col-sm mb-3">
            <p className="text-center">
              Number of failures: <strong>{failures}</strong>
            </p>
          </div>
          <div className="col-sm mb-3 me-3">
            <FancyButton onClick={onRestart}>Restart</FancyButton>
          </div>
        </div>
      </div>
    </div>
  );
};
BarraInformativa.propTypes = {
  aciertos: PropTypes.number,
  fallos: PropTypes.number,
  onRestart: PropTypes.func,
};
const WinnerCard = ({ show, hits, failures, onRestart = () => {} }) => {
  return (
    <div className={cx('winner-card', { 'winner-card--hidden': !show })}>
      <span className="winner-card-text">{`You win the game with ${hits} hit and ${failures} failures`}</span>
      <FancyButton onClick={onRestart}>Play again?</FancyButton>
    </div>
  );
};

WinnerCard.propTypes = {
  show: PropTypes.bool.isRequired,
  hits: PropTypes.number,
  failures: PropTypes.number,
  onRestart: PropTypes.func,
};
const Card = ({ id, image, isFlipped, onClick }) => {
  return (
    <div className="col-sm mb-3 me-3">
      <button id={`frame${id}`} onClick={onClick} className="frame">
        <img
          id={`image${id}`}
          className="img-fluid"
          src={isFlipped ? `img/${image}.jpg` : `img/logo.jpg`}
          alt={`Imagen de ${image}`}
        />
      </button>
    </div>
  );
};

Card.propTypes = {
  id: PropTypes.number,
  image: PropTypes.string,
  isFlipped: PropTypes.bool,
  onClick: PropTypes.func,
};

const useMemoTestGameState = (initialGameMode) => {
  const [gameEnded, setGameEnded] = useState(initialGameMode);
  const [images, setImages] = useState(Array(12).fill({ name: 'logo', isFlipped: false }));
  const [firstCard, setFirstCard] = useState(null);
  const [secondCard, setSecondCard] = useState(null);
  const [selectionTurnCard, setSelectionTurn] = useState(true);
  const [hits, setHits] = useState(0);
  const [failures, setFailures] = useState(0);

  const hitAudio = new Audio(hitSound);
  const failAudio = new Audio(failSound);
  const selectAudio = new Audio(selectSound);
  const winAudio = new Audio(winSound);

  const reorderImg = () => {
    const imagesOriginal = [
      { name: 'ciri', isFlipped: false },
      { name: 'ciri', isFlipped: false },
      { name: 'gaskier', isFlipped: false },
      { name: 'gaskier', isFlipped: false },
      { name: 'gerald', isFlipped: false },
      { name: 'gerald', isFlipped: false },
      { name: 'vesemir', isFlipped: false },
      { name: 'vesemir', isFlipped: false },
      { name: 'triss', isFlipped: false },
      { name: 'triss', isFlipped: false },
      { name: 'yennefer', isFlipped: false },
      { name: 'yennefer', isFlipped: false },
    ];
    imagesOriginal.sort(function () {
      return Math.random() - 0.5;
    });
    return imagesOriginal;
  };

  console.log(secondCard);

  function handleClick(i) {
    const clickedImage = images[i];
    if (clickedImage.isFlipped || selectionTurnCard) {
      return;
    }
    if (firstCard === null) {
      const newImages = [...images];
      newImages[i] = { ...newImages[i], isFlipped: true };
      setImages(newImages);
      setFirstCard(i);
      selectAudio.play();
    } else {
      const newImages = [...images];
      newImages[i] = { ...newImages[i], isFlipped: true };
      setImages(newImages);
      setSelectionTurn(true);
      setSecondCard(i);
      selectAudio.play();
      if (images[firstCard].name === images[i].name) {
        const newImages = [...images];
        newImages[firstCard] = { ...newImages[firstCard], isFlipped: true };
        newImages[i] = { ...newImages[i], isFlipped: true };
        setImages(newImages);
        setFirstCard(null);
        setSecondCard(null);
        setSelectionTurn(false);
        setHits(hits + 1);
        hitAudio.play();
      } else {
        setTimeout(() => {
          const newImages = [...images];
          newImages[firstCard] = { ...newImages[firstCard], isFlipped: false };
          newImages[i] = { ...newImages[i], isFlipped: false };
          setImages(newImages);
          setFirstCard(null);
          setSecondCard(null);
          setSelectionTurn(false);
          setFailures(failures + 1);
          failAudio.play();
        }, 500);
      }
    }
  }

  const handlePlay = () => {
    const newImages = reorderImg();
    setImages(newImages);
    setGameEnded(false);
    setFirstCard(null);
    setSecondCard(null);
    setSelectionTurn(false);
  };

  const handleRestart = () => {
    setImages(Array(12).fill({ name: 'Gerald', isFlipped: false }));
    setGameEnded(false);
    setFirstCard(null);
    setSecondCard(null);
    setSelectionTurn(true);
  };

  useEffect(() => {
    if (images.every((image) => image.isFlipped)) {
      winAudio.play();
      setGameEnded(true);
    }
  }, [images, setGameEnded, winAudio]);

  return {
    gameEnded,
    images,
    hits,
    failures,
    setGameEnded,
    setImages,
    handleClick,
    handlePlay,
    handleRestart,
    useEffect,
  };
};

const MemoTest = () => {
  const { gameEnded, images, hits, failures, handleClick, handlePlay, handleRestart } = useMemoTestGameState(false);

  return (
    <div className="d-md-flex justify-content-center">
      {
        <React.Fragment>
          <WinnerCard show={gameEnded} hits={hits} failures={failures} onRestart={handlePlay} />
          <BarraInformativa hits={hits} failures={failures} onPlay={handlePlay} onRestart={handleRestart} />
          <div className={`d-md-flex justify-content-center ${gameEnded ? 'hide' : ''}`}>
            <div className="flex-md-row filas">
              <Card
                key={0}
                id={1}
                image={images[0].name}
                isFlipped={images[0].isFlipped}
                onClick={() => handleClick(0)}
              />
              <Card
                key={1}
                id={2}
                image={images[1].name}
                isFlipped={images[1].isFlipped}
                onClick={() => handleClick(1)}
              />
              <Card
                key={2}
                id={3}
                image={images[2].name}
                isFlipped={images[2].isFlipped}
                onClick={() => handleClick(2)}
              />
            </div>
            <div className="flex-md-row filas">
              <Card
                key={3}
                id={4}
                image={images[3].name}
                isFlipped={images[3].isFlipped}
                onClick={() => handleClick(3)}
              />
              <Card
                key={4}
                id={5}
                image={images[4].name}
                isFlipped={images[4].isFlipped}
                onClick={() => handleClick(4)}
              />
              <Card
                key={5}
                id={6}
                image={images[5].name}
                isFlipped={images[5].isFlipped}
                onClick={() => handleClick(5)}
              />
            </div>
            <div className="flex-md-row filas">
              <Card
                key={6}
                id={7}
                image={images[6].name}
                isFlipped={images[6].isFlipped}
                onClick={() => handleClick(6)}
              />
              <Card
                key={7}
                id={8}
                image={images[7].name}
                isFlipped={images[7].isFlipped}
                onClick={() => handleClick(7)}
              />
              <Card
                key={8}
                id={9}
                image={images[8].name}
                isFlipped={images[8].isFlipped}
                onClick={() => handleClick(8)}
              />
            </div>
            <div className="flex-md-row">
              <Card
                key={9}
                id={10}
                image={images[9].name}
                isFlipped={images[9].isFlipped}
                onClick={() => handleClick(9)}
              />
              <Card
                key={10}
                id={11}
                image={images[10].name}
                isFlipped={images[10].isFlipped}
                onClick={() => handleClick(10)}
              />
              <Card
                key={11}
                id={12}
                image={images[11].name}
                isFlipped={images[11].isFlipped}
                onClick={() => handleClick(11)}
              />
            </div>
          </div>
        </React.Fragment>
      }
    </div>
  );
};
export default MemoTest;
