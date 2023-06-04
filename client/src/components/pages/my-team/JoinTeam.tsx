import { Dispatch, SetStateAction, useEffect, useState } from "react";

import Modal from "@/components/Modal";
import { IEquipo } from "@/types";
import { ethers } from "ethers";
import ModalCreateTeam from "@/components/ModalCreateTeam";

type Props = {
  updateHasTeam: Dispatch<SetStateAction<boolean>>;
  leagueDetails: any;
  teams: any;
  hasTeam: boolean;
};

export default function JoinTeam({
  updateHasTeam,
  leagueDetails,
  teams,
  hasTeam,
}: Props) {
  const [selectedItem, setSelectedItem] = useState<IEquipo | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  useEffect(() => {
    console.log(teams);
    console.log(leagueDetails);
  }, [leagueDetails, teams]);
  const handleItemClick = (id: number) => {
    setShowModal(true);
    // const item = equipos.find((equipo) => equipo.id === id);
    // if (item) {
    //   setShowModal(true);
    //   setSelectedItem(item);
    //   document.body.classList.add('overflow-hidden');
    // }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    document.body.classList.remove("overflow-hidden");
  };
  const handleCloseModalTeam = () => {
    setShowCreateModal(false);
  };

  return (
    <div className="flex flex-col gap-8">
      <div className="flex gap-10">
        <div
          id="info"
          className="sticky top-24 h-fit border-2 border-cyan-700 bg-opacity-60 bg-cyan-950 w-full max-w-sm rounded-md p-6 flex flex-col gap-4"
        >
          <h4 className="font-bold text-center text-xl">
            Información de la liga
          </h4>
          <div>
            <span className="font-bold">Nombre: </span>
            <span>{leagueDetails?.name}</span>
          </div>
          <div>
            <span className="font-bold">Max. Equipos: </span>
            <span>{leagueDetails?.maxTeams}</span>
          </div>
          <div>
            <span className="font-bold">Min. Equipos: </span>
            <span>{leagueDetails?.minTeams}</span>
          </div>
          <div className="flex gap-2">
            <span className="font-bold">Premio:</span>
            {leagueDetails && (
              <span>{`Suscripción a Platzi por 3 meses para cada integrante del equipo \n + ${ethers.utils.formatEther(
                leagueDetails?.prize
              )} MATIC`}</span>
            )}
          </div>
          {!hasTeam && (
            <button
              className="p-2 text-white rounded-md w-28 mx-auto bg-green-800 cursor-pointer"
              onClick={() => setShowCreateModal(true)}
            >
              Crear equipo
            </button>
          )}
        </div>
        {teams && (
          <div id="teams" className="flex-1 flex flex-col gap-4 text-center">
            <span className="block text-center font-bold text-xl">Equipos</span>
            <div className="flex-1">
              <div className="sticky py-2 grid grid-cols-[auto_1fr_1fr_1fr] px-2 border-b border-gray-500">
                <div className="w-20">N°</div>
                <div>Equipo</div>
                <div>Jugadores</div>
                <div>Estado</div>
              </div>
              {teams.map((team: any, index: number) => (
                <div
                  key={index}
                  className="border-b border-gray-500 grid grid-cols-[auto_1fr_1fr_1fr] py-4 px-2 items-center"
                >
                  <div className="w-20">{index + 1}</div>
                  <div>{team.name}</div>
                  <div>{team.players.length}</div>
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
        )}
      </div>
      {showModal && (
        <Modal
          confirmTeam={updateHasTeam}
          selectedItem={selectedItem}
          onClose={handleCloseModal}
        />
      )}
      {showCreateModal && (
        <ModalCreateTeam
          confirmTeam={updateHasTeam}
          selectedItem={selectedItem}
          onClose={handleCloseModalTeam}
        />
      )}
    </div>
  );
}

const equipos = [
  { id: 1, name: "Águilas Radiantes", players: 5 },
  { id: 2, name: "Leones Furiosos", players: 3 },
  { id: 3, name: "Tigres Eléctricos", players: 4 },
  { id: 4, name: "Cobras Veloces", players: 3 },
  { id: 5, name: "Lobos Plateados", players: 4 },
  { id: 6, name: "Dragones Ardientes", players: 5 },
  { id: 7, name: "Fénix Poderosos", players: 2 },
  { id: 8, name: "Panteras Sigilosas", players: 5 },
  { id: 9, name: "Búhos Sabios", players: 2 },
  { id: 10, name: "Jaguares Ágiles", players: 2 },
];
