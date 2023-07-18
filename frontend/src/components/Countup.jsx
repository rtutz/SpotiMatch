import { useEffect, useState } from 'react';

const Countup = ({ value }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const animationDuration = 2000; // Duration in milliseconds
    const framesPerSecond = 60;
    const increment = value / (animationDuration / 1000 * framesPerSecond);

    const timer = setInterval(() => {
      setCount(prevCount => {
        if (prevCount + increment >= value) {
          clearInterval(timer);
          return value;
        } else {
          return prevCount + increment;
        }
      });
    }, 1000 / framesPerSecond);

    return () => {
      clearInterval(timer);
    };
  }, [value]);

  return <h1 className="text-7xl font-black text-spotify-green"> {count.toFixed(0) === "100" ? '100%' : count.toFixed(2) + '%'}</h1>;
};

export default Countup;