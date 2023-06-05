import React, {
  ChangeEvent,
  Dispatch,
  MouseEvent,
  SetStateAction,
  useState,
} from "react";
import { fetchSigner } from '@wagmi/core';
import { useAccount } from 'wagmi'
import { IEquipo } from "@/types";
import { ethers } from "ethers";
import { leagueAddress } from '@/helpers/Constants';
import leagueABI from '../artifacts/LeagueABI.json'
type Props = {
  selectedItem: IEquipo | null;
  onClose: () => void;
  confirmTeam: Dispatch<SetStateAction<boolean>>;
};

export default function ModalCreateTeam({
  selectedItem,
  onClose,
  confirmTeam,
}: Props) {
  const [teamName, setTeamName] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const handleOutsideClick = (event: MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  const handleSubmit = async () => {
    if (teamName === "" || teamName.length < 3) {
      setErrorMsg("Por favor llena el nombre del equipo correctamente");
    }
    try {
      setLoading(true);
      const signer = await fetchSigner();
      const contract = new ethers.Contract(leagueAddress, leagueABI, signer ? signer : undefined);
      let transaction = await contract.addTeam(teamName);
      console.log(transaction);
      onClose();
    } catch (error) {
      console.log(error);
      setErrorMsg("Hubo un problema creando el equipo, intenta de nuevo");
    }
  };
  const setErrorMsg = (msg: string) => {
    setError(msg);
    setTimeout(() => {
      setError("");
    }, 4000);
  };
  return (
    <div
      className="fixed top-0 left-0 z-50 w-full max-w-screen h-screen bg-black backdrop-blur-sm bg-opacity-40 flex justify-center items-center"
      onClick={handleOutsideClick}
    >
      <div className="bg-sky-950 border-2 border-cyan-700 p-8 rounded-md w-full max-w-sm flex flex-col gap-6">
        <span className="text-center font-bold text-xl">Crear equipo</span>
        <p>Nombre del Equipo:</p>
        <input
          className="rounded-md text-base"
          type="text"
          placeholder="Nombre de tu equipo ..."
          onChange={(e) => setTeamName(e.target.value)}
          value={teamName}
        />
        {error && (
          <p className="text-orange-700 text-center text-base">{error}</p>
        )}
        <p>Luego de ejecutar la transacción espera 1-2 minutos a que se complete y refresca la pagina</p>
        <div className="flex justify-center gap-16">
          {!loading && (
            <button
              onClick={onClose}
              className="btn-primary bg-black self-center"
            >
              Cerrar
            </button>
          )}
          {loading ? (
            <button>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="animate-spin"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
                />
              </svg>
              Creando
            </button>
          ) : (
            <span className={teamName ? "" : "cursor-not-allowed"}>
              <button
                className={`btn-primary bg-green-800 ${
                  !!teamName ? "" : "pointer-events-none"
                } `}
                onClick={handleSubmit}
              >
                <span>Crear</span>
              </button>
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
