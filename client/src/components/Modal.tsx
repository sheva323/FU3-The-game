import React, { ChangeEvent, Dispatch, MouseEvent, SetStateAction, useState } from 'react';

import { IEquipo } from '@/types';

type Props = {
  selectedItem: IEquipo | null;
  onClose: () => void;
  confirmTeam: Dispatch<SetStateAction<boolean>>;
};

export default function Modal({ selectedItem, onClose, confirmTeam }: Props) {
  const [position, setPosition] = useState<string>('');

  const handleOutsideClick = (event: MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setPosition(e.target.value);
  };

  const handleSubmit = () => {
    if (position !== '') {
      confirmTeam(true);
    }

    onClose();
  };

  return (
    <div
      className="fixed top-0 left-0 z-50 w-full max-w-screen h-screen bg-black backdrop-blur-sm bg-opacity-40 flex justify-center items-center"
      onClick={handleOutsideClick}
    >
      <div className="bg-sky-950 border-2 border-cyan-700 p-8 rounded-md w-full max-w-sm flex flex-col gap-6">
        <span className="text-center font-bold text-xl">Seleccionar posición</span>
        <p>Equipo: {selectedItem?.name}</p>
        <p>Jugadores: {selectedItem?.players}</p>
        <div className="self-center">
          <select
            name="position"
            id="position"
            className="bg-gray-100 text-black outline-none p-2 text-center rounded-md"
            onChange={handleChange}
          >
            <option defaultValue={''} hidden>
              Posiciones disponibles
            </option>
            <option value="top">Delatero</option>
            <option value="mid">Medio</option>
            <option value="def">Defensa</option>
            <option value="portero">Portero</option>
          </select>
        </div>
        <div className="flex justify-center gap-16">
          <button onClick={onClose} className="btn-primary bg-black self-center">
            Cerrar
          </button>
          <span className={position ? '' : 'cursor-not-allowed'}>
            <button
              className={`btn-primary bg-green-800 ${!!position ? '' : 'pointer-events-none'}`}
              onClick={handleSubmit}
            >
              Confirmar
            </button>
          </span>
        </div>
      </div>
    </div>
  );
}
