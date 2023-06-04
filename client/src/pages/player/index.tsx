import React, { ChangeEvent, useState } from "react";
import Hero from "@/components/Hero";
import PageLayout from "@/layouts/PageLayout";
import Notificacions from "@/components/notifications";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useEffect } from "react";
import { BigNumber, ethers } from "ethers";
import Web3 from "web3";
import { fetchSigner } from "@wagmi/core";
import { useAccount } from "wagmi";
import PlayerABI from "../../artifacts/PlayerABI.json";
import ModalCreatePlayer from "@/components/ModalCreatePlayer";
import { playerAddress } from "@/helpers/Constants";
//Player NFT Contract
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

export default function Player() {
  const { address, isConnected } = useAccount();
  const [avatar, setAvatar] = useState("0");
  const [hasPlayer, setHasPlayer] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [playerInfo, setPlayerInfo] = useState<string[]>([]);
  useEffect(() => {
    console.log(address);
    checkHasPlayer();
  }, [isConnected]);
  const checkHasPlayer = async () => {
    try {
      const signer = await fetchSigner();
      const contract = new ethers.Contract(playerAddress, PlayerABI, signer);
      let transaction = await contract.checkIsPlayer(address);
      setHasPlayer(transaction);
      let readTokenId = await contract.tokenOfOwnerByIndex(address, 0);
      const id = BigNumber.from(readTokenId._hex).toString();
      let getPlayerInfo = await contract.readProperties(id);
      console.log(getPlayerInfo);
      console.log(splitValue(getPlayerInfo));
      setPlayerInfo(splitValue(getPlayerInfo));
    } catch (error) {
      console.log("error reading isPlayer", error);
    }
  };
  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    console.log(e.target.value);
    setAvatar(e.target.value);
  };
  const handleCloseModal = () => {
    setShowModal(false);
  };
  function splitValue(value : string) {
    const chunkSize = 3; // Tamaño de cada fragmento
    const chunks = [];
    
    // Dividir la cadena en fragmentos de tamaño chunkSize
    for (let i = 0; i < value.length; i += chunkSize) {
      const chunk = value.substr(i, chunkSize);
      chunks.push(chunk);
    }
    return chunks;
  }
  return (
    <PageLayout title="Inicio" bgGradient>
      <div className="flex flex-row gap-20 p-16">
        {hasPlayer ? (
          <section className="w-full">
            <div className="mb-16 flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <h4 className="text-2xl font-bold">{`Tu jugador (${address})`}</h4>
                <span className="font-semibold text-gray-300">
                  Estas son las caracteristicas que tiene tu jugador
                </span>
                <div className="h-[1px] bg-white w-9" />
              </div>
              <p>Ritmo: {playerInfo[0]}</p>
              <p>Tiro: {playerInfo[1]}</p>
              <p>Pase: {playerInfo[2]}</p>
              <p>Esquiva: {playerInfo[3]}</p>
              <p>Defensa: {playerInfo[4]}</p>
              <p>Físico: {playerInfo[5]}</p>
              <p>Estirada: {playerInfo[6]}</p>
              <p>Parada: {playerInfo[7]}</p>
              <p>Reflejos: {playerInfo[8]}</p>
              <p>Velocidad Arquero: {playerInfo[9]}</p>
              <p>Saque: {playerInfo[10]}</p>
              <p>Posición Arquero: {playerInfo[11]}</p>
              <div className="flex justify-center items-center bg-gray-800 rounded-md">
                <img src={Avatars[parseInt(avatar)]} className="rounded-md" />
              </div>
              <button className="btn-primary bg-cyan-600 ml-auto mr-10">
                <text style={{ padding: 10 }}>
                  Actualizar Puntos del Jugador
                </text>
              </button>
            </div>
          </section>
        ) : (
          <>
            <section className="w-full">
              <div className="mb-16 flex flex-col gap-4">
                <div className="flex flex-col gap-2">
                  <h4 className="text-2xl font-bold">Crea tu Jugador</h4>
                  <span className="font-semibold text-gray-300">
                    Aún no tienes un jugador, cual Avatar te gusta más?
                  </span>
                  <div className="h-[1px] bg-white w-9" />
                </div>
                <p>
                  Crea tu jugador, juega partidos y gana puntos para mejorarlo y
                  ganar ligas y premios.
                </p>
                <p className="underline decoration-sky-500">
                  Si ya creaste un jugador, espera unos minutos mientras se completa la transacción, refresca esta pagina.
                </p>
                <div className="self-center">
                  <select
                    name="position"
                    id="position"
                    className="bg-gray-100 text-black outline-none p-2 text-center rounded-md"
                    onChange={handleChange}
                  >
                    <option defaultValue={""} hidden>
                      Escoje tu jugador
                    </option>
                    <option value="0">Carla</option>
                    <option value="1">Alex</option>
                    <option value="2">Fernanda</option>
                    <option value="3">Alexa</option>
                    <option value="4">Adri</option>
                    <option value="5">Cristina</option>
                    <option value="6">Cristian</option>
                    <option value="7">Sebas</option>
                    <option value="8">Oscar</option>
                    <option value="9">Manu</option>
                  </select>
                </div>

                <div className="flex justify-center items-center bg-gray-800 rounded-md">
                  <img src={Avatars[parseInt(avatar)]} className="rounded-md" />
                </div>
                <button
                  className="btn-primary bg-cyan-600 ml-auto mr-10"
                  onClick={() => setShowModal(true)}
                >
                  Crear
                </button>
              </div>
            </section>
            <section className="w-full grid gap-8 grid-rows-5 grid-cols-3">
              {Avatars.map((item, index) => {
                return (
                  <div
                    key={index}
                    className="flex justify-center items-center bg-gray-800 rounded-md"
                  >
                    <img src={item} className="rounded-lg" />
                  </div>
                );
              })}
            </section>
          </>
        )}
        {showModal && (
          <ModalCreatePlayer
            selectedItem={avatar}
            onClose={handleCloseModal}
          />
        )}
      </div>
    </PageLayout>
  );
}
