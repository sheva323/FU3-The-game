import { Dispatch, SetStateAction, useState } from 'react';

import Modal from '@/components/Modal';
import { IEquipo } from '@/types';

type Props = {
  updateHasTeam: Dispatch<SetStateAction<boolean>>;
};

export default function JoinTeam({ updateHasTeam }: Props) {
  const [selectedItem, setSelectedItem] = useState<IEquipo | null>(null);
  const [showModal, setShowModal] = useState(false);

  const handleItemClick = (id: number) => {
    const item = equipos.find((equipo) => equipo.id === id);
    if (item) {
      setSelectedItem(item);
      setShowModal(true);
      document.body.classList.add('overflow-hidden');
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    document.body.classList.remove('overflow-hidden');
  };

  return (
    <div className="flex flex-col gap-8">
      <div className="flex gap-10">
        <div
          id="info"
          className="sticky top-24 h-fit border-2 border-cyan-700 bg-opacity-60 bg-cyan-950 w-full max-w-sm rounded-md p-6 flex flex-col gap-4"
        >
          <h4 className="font-bold text-center text-xl">Información de la liga</h4>
          <div>
            <span className="font-bold">Nombre: </span>
            <span>Liga Platzi</span>
          </div>
          <div>
            <span className="font-bold">Max. Equipos: </span>
            <span>10</span>
          </div>
          <div>
            <span className="font-bold">Min. Equipos: </span>
            <span>4</span>
          </div>
          <div className="flex gap-2">
            <span className="font-bold">Premio:</span>
            <span>Suscripción a Platzi por 3 meses para cada integrante del equipo</span>
          </div>
        </div>
        <div id="teams" className="flex-1 flex flex-col gap-4 text-center">
          <span className="block text-center font-bold text-xl">Equipos</span>
          <div className="flex-1">
            <div className="sticky py-2 grid grid-cols-[auto_1fr_1fr_1fr] px-2 border-b border-gray-500">
              <div className="w-20">N°</div>
              <div>Equipo</div>
              <div>Jugadores</div>
              <div>Estado</div>
            </div>
            {equipos.map((team, idx) => (
              <div
                key={idx}
                className="border-b border-gray-500 grid grid-cols-[auto_1fr_1fr_1fr] py-4 px-2 items-center"
              >
                <div className="w-20">{idx + 1}</div>
                <div>{team.name}</div>
                <div>{team.players}</div>
                {team.players < 5 ? (
                  <button
                    className="p-2 text-white rounded-md w-28 mx-auto bg-green-800 cursor-pointer"
                    onClick={() => handleItemClick(team.id)}
                  >
                    Unirme
                  </button>
                ) : (
                  <span className="p-2 text-white rounded-md w-28 mx-auto bg-red-800 cursor-not-allowed">
                    Completo
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
      {showModal && (
        <Modal confirmTeam={updateHasTeam} selectedItem={selectedItem} onClose={handleCloseModal} />
      )}
    </div>
  );
}

const equipos = [
  { id: 1, name: 'Águilas Radiantes', players: 5 },
  { id: 2, name: 'Leones Furiosos', players: 3 },
  { id: 3, name: 'Tigres Eléctricos', players: 4 },
  { id: 4, name: 'Cobras Veloces', players: 3 },
  { id: 5, name: 'Lobos Plateados', players: 4 },
  { id: 6, name: 'Dragones Ardientes', players: 5 },
  { id: 7, name: 'Fénix Poderosos', players: 2 },
  { id: 8, name: 'Panteras Sigilosas', players: 5 },
  { id: 9, name: 'Búhos Sabios', players: 2 },
  { id: 10, name: 'Jaguares Ágiles', players: 2 },
];
