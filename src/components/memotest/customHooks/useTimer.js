import React, { useState, useEffect, useRef } from 'react';

function useInterval(callback, delay) {
  const savedCallback = useRef();

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    function tick() {
      savedCallback.current();
    }

    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}

const useTimer = gameEnded => {
    const [minutes, setMinutes] = useState(0);
    const [seconds, setSeconds] = useState(0);

    useInterval(() => {
      setSeconds(seconds + 1);

      if(seconds === 59) {
          setSeconds(0);
          setMinutes(minutes + 1);
      }
    }, !gameEnded ? 1000 : null);

    return { minutes, seconds };
  }

  export default useTimer;