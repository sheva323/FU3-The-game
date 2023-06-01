import React, { useState, useEffect, useCallback } from 'react';

type Props = {
  targetDate: string | number;
  onTimerEnd: () => void;
};

export default function Timer({ targetDate, onTimerEnd }: Props) {
  const calculateTimeRemaining = useCallback(() => {
    const currentTime = new Date().getTime();
    const targetTime = new Date(targetDate).getTime();

    return targetTime - currentTime;
  }, [targetDate]);

  const [remainingTime, setRemainingTime] = useState(calculateTimeRemaining());

  useEffect(() => {
    const timer = setInterval(() => {
      const timeRemaining = calculateTimeRemaining();

      if (timeRemaining <= 0) {
        clearInterval(timer);
        onTimerEnd();
      } else {
        setRemainingTime(timeRemaining);
      }
    }, 1000);

    return () => clearInterval(timer); // Limpiar el interval al desmontar el componente
  }, [calculateTimeRemaining, onTimerEnd]);

  const formatTime = (time: number) => {
    const seconds = Math.floor((time / 1000) % 60);
    const minutes = Math.floor((time / 1000 / 60) % 60);
    const hours = Math.floor((time / (1000 * 60 * 60)) % 24);
    const days = Math.floor(time / (1000 * 60 * 60 * 24));

    return `${days} ${
      days === 1 ? 'dia' : 'dias'
    }, ${hours} horas, ${minutes} minutos, ${seconds} segundos`;
  };

  return <p>El partido empieza en: {formatTime(remainingTime)}</p>;
}
