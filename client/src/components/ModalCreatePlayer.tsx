import React, {
  MouseEvent,
  useState,
} from "react";
import { playerAddress, mintValue } from "@/helpers/Constants";
import PlayerABI from "../artifacts/PlayerABI.json";
import { fetchSigner } from '@wagmi/core';
import { useAccount } from 'wagmi';
import { ethers } from "ethers";

type Props = {
  selectedItem: string | null;
  onClose: () => void;
};
const Avatars = [
  "https://gateway.pinata.cloud/ipfs/QmPh6kqZhekVcDTZtY4QjnQ9wEAXxrRHhJNXT4KyqSECnK",
  "https://gateway.pinata.cloud/ipfs/QmPyiob4VQzPjuTrsvqEEu5iBgspWeCMd6FwSWqQXVzEEn",
  "https://gateway.pinata.cloud/ipfs/QmNYdcNvFQYPfpWj3xoWfnpcu52euoTbaxhCFhhMBXD5jX",
  "https://gateway.pinata.cloud/ipfs/QmaooZMmADkQSUxjwwS3UXLPGNT7UMBQofcG1JuHDV9sia",
  "https://gateway.pinata.cloud/ipfs/Qmen64CHyBdKSNtyuo3fs7NSNqGNwfQZkTk9NqzAssnSwv",
  "https://gateway.pinata.cloud/ipfs/QmZNHy7MAiKFU5wHYkwsiGoJKwT5jYBmTiwaL9FNGccdce",
  "https://gateway.pinata.cloud/ipfs/QmZmku4bd4VqTVzXLrgbah5weF4XQ4tc9foNbGZk5yr4rr",
  "https://gateway.pinata.cloud/ipfs/QmZRyhobCWhZZVKds54E23dfEp6X22Asvg7in36VqW969x",
  "https://gateway.pinata.cloud/ipfs/Qmet6i96rfwnA4MtePhvi2N98csv9gbHxTWV7n74BfM5sA",
  "https://gateway.pinata.cloud/ipfs/Qmak1ofmJBNXWYSokC7omdfTggCqGenxz6SXpqnZ9XixZK",
];
export default function ModalCreatePlayer({
  selectedItem,
  onClose,
}: Props) {
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [purchased, setPurchased] = useState(false);  
  const [tx, setTx] = useState('');
  const handleOutsideClick = (event: MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };
  const handleClose = () => {
    setTx('');
    setPurchased(false);
    setLoading(false);
    setError('');
    onClose();
    window.location.reload();
  }
  const handleSubmit = async() => {
    try {
      setLoading(true);
      const signer = await fetchSigner();
      const contract = new ethers.Contract(playerAddress, PlayerABI, signer ? signer : undefined);
      const transaction = await contract.mint(selectedItem, {
        value: ethers.utils.parseEther(mintValue)
      });
      setLoading(false);
      setTx(transaction.hash);
      setPurchased(true);

    } catch (error) {
      console.log(error);
      setErrorMsg('Hubo un problema creando el avatar');
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
      {purchased ?
      <div className="bg-sky-950 border-2 border-cyan-700 p-8 rounded-md w-full max-w-sm flex flex-col gap-6">
      <span className="text-center font-bold text-xl">Felicitaciones</span>
      <p className="text-center">Ya tienes tu jugador</p>
      <div className="flex justify-center">
        <img src={Avatars[selectedItem]} style={{maxHeight: 300}}/>
      </div>
      <p className="text-center">{`Puedes ver la transacción con este HASH ${tx}`}</p>
      <div className="flex justify-center gap-16">
          <button
            onClick={handleClose}
            className="btn-primary bg-black self-center"
          >
            Cerrar
          </button>
      </div>
    </div>
      :
      <div className="bg-sky-950 border-2 border-cyan-700 p-8 rounded-md w-full max-w-sm flex flex-col gap-6">
        <span className="text-center font-bold text-xl">Crear Jugador</span>
        <p className="text-center">Vas a usar el siguiente avatar, estás seguro?</p>
        <div className="flex justify-center">
          <img src={Avatars[selectedItem]} style={{maxHeight: 300}}/>
        </div>
        {error && (
          <p className="text-orange-700 text-center text-base">{error}</p>
        )}
        <p className="text-center">{"El costo de crear el avatar es 0.00001 ether \n Despues de aceptar espera a que la transacción se complete (1-2 minutos)"}</p>
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
            <span >
              <button
                className={"btn-primary bg-green-800"}
                onClick={handleSubmit}
              >
                <span>Aceptar</span>
              </button>
            </span>
          )}
        </div>
      </div>}
    </div>
  );
}
