import { useEffect, useState } from 'react';

import PageLayout from '@/layouts/PageLayout';
import Timer from '@/components/Timer';

export default function PlayPage() {
  const [hasStarted, setHasStarted] = useState(false);

  const startMatch = () => {
    setHasStarted(true);
  };

  return (
    <PageLayout
      title="Jugar"
      bgGradient
      className="flex flex-col justify-center items-center gap-8"
    >
      <div className="flex gap-2 text-4xl font-bold">
        <span>Liga Platzi</span>
        <span>-</span>
        <span>Fecha 2</span>
      </div>
      <div className="flex gap-2 text-2xl font-bold">
        <span>Equipo 1</span>
        <span>VS</span>
        <span>Equipo 2</span>
      </div>
      <span>2 de junio 2pm UTC-5</span>
      <div>
        {hasStarted ? (
          <button className="btn-primary bg-blue-700">Ver resultado</button>
        ) : (
          <div className="cursor-not-allowed">
            <span className="btn-primary bg-gray-500 block text-center pointer-events-none">
              Ver resultado
            </span>
          </div>
        )}
      </div>
      <Timer targetDate={matchDate} onTimerEnd={startMatch} />
    </PageLayout>
  );
}

const tenSeconds = new Date().setSeconds(new Date().getSeconds() + 10);
const twoDays = new Date().setDate(new Date().getDate() + 2);
const matchDate = twoDays;
