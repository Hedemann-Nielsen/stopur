import style from "./Stopwatch.module.scss";
import React, { useState, useEffect } from "react";

const Stopwatch = () => {
  const [time, setTime] = useState(0);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    let interval;

    if (isActive) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 10);
      }, 10);
    } else {
      clearInterval(interval);
    }

    return () => {
      clearInterval(interval);
    };
  }, [isActive]);

  const handleStartStop = () => {
    setIsActive((prevIsActive) => !prevIsActive);
  };

  const handleReset = () => {
    setTime(0); 
    setIsActive(false);
  };

  return (
    <div className={style.container}>
      <div className={style.watch}>
        <div className={style.stopwatchText}>
            <h1>{formatTime(time)}</h1>
            <div className={style.stopwatchbuttons}>
              <button onClick={handleStartStop}>
                {isActive ? "Stop" : "Start"}
              </button>
              <button onClick={handleReset}>Reset</button>
            </div>
        </div>
      </div>  
    </div>
    
  );
};

const formatTime = (timeInMilliseconds) => {
  const minutes = Math.floor(timeInMilliseconds / (60 * 1000));
  const seconds = Math.floor((timeInMilliseconds % (60 * 1000)) / 1000);
  const milliseconds = Math.floor((timeInMilliseconds % 1000) / 10);

  const formattedMinutes = String(minutes).padStart(2, "0");
  const formattedSeconds = String(seconds).padStart(2, "0");
  const formattedMilliseconds = String(milliseconds).padStart(2, "0");

  return `${formattedMinutes}:${formattedSeconds}.${formattedMilliseconds}`;
};

export default Stopwatch;
